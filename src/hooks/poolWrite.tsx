import { utils, BigNumber } from "ethers";
import { useEffect, useLayoutEffect, useState } from "react";
import { useAccount, useWaitForTransaction } from "wagmi";
import {
  usePoolCancelOrder,
  usePoolCreateOrder,
  usePoolFulfillOrder,
  usePreparePoolCancelOrder,
  usePreparePoolCreateOrder,
  usePreparePoolFulfillOrder,
} from "./contracts/pool";
import { toast } from "react-toastify";
import Link from "@mui/material/Link";
import {
  usePrepareTokenApprove,
  useTokenAllowance,
  useTokenApprove,
} from "./contracts/token";
import { usePoolStore } from "store";
import TransactionToast from "components/Common/Toast/TransactionToast";
import { Pool, Token } from "types";
import { zeroBigNumber } from "utility";

interface CreateOrderProps {
  amount: BigNumber;
  price: BigNumber;
  boost: BigNumber;
  pool: Pool;
}
export const useCreateOrder = ({
  amount,
  price,
  boost,
  pool,
}: CreateOrderProps) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(Date.now() * 1000 + 120);
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const { address } = useAccount();
  const { config } = usePreparePoolCreateOrder({
    address: pool.address,
    args: [
      amount,
      price,
      address as `0x${string}`,
      utils.parseUnits(time.toString(), 0),
    ],
    overrides: {
      value: boost,
    },
    enabled: !amount.isZero() && !price.isZero() && !!address,
    onError: (error) => {
      // toast.error(error.message.substring(0, 200));
    },
  });

  const { data: writeData, write } = usePoolCreateOrder({
    ...config,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { data: waitedData } = useWaitForTransaction({
    hash: writeData?.hash,
    onSuccess: (data) => {
      toast.success(
        <TransactionToast
          text="Order created successfully."
          hash={data.transactionHash}
        />
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { waitedData, write };
};

interface AllowanceProps {
  amount: string | undefined;
  pool: Pool;
  token: Token;
}
export const useAllowance = ({ amount = "0", pool, token }: AllowanceProps) => {
  const [isApproved, setIsApproved] = useState(false);
  const { address } = useAccount();
  const { data: allowanceValue } = useTokenAllowance({
    address: token.address,
    args: [address as `0x${string}`, pool.address],
    enabled: !!address,
    watch: true,
  });
  // console.log(allowanceValue);
  allowanceValue &&
    console.log(
      "all",
      token.address,
      Number(utils.formatUnits(allowanceValue, token.decimals))
    );
  const needAllowance =
    Number(utils.formatUnits(allowanceValue ?? zeroBigNumber, token.decimals)) <
    Number(amount);

  const { config, refetch } = usePrepareTokenApprove({
    address: token.address,
    args: [
      pool.address,
      utils.parseUnits(Number(amount).toFixed(token.decimals), token.decimals),
    ],
    enabled: needAllowance,
    cacheTime: 0,
  });
  const { write, data: writeData } = useTokenApprove({
    ...config,
    onError: (error) => {
      toast.error(error.message);
    },
  });
  console.log("app", isApproved);

  useWaitForTransaction({
    hash: writeData?.hash,
    onSuccess: (data) => {
      toast.success(
        <TransactionToast
          text="Contract approved successfully."
          hash={data.transactionHash}
        />
      );
    },
  });
  useLayoutEffect(() => {
    if (needAllowance) {
      setIsApproved(false);
    } else {
      setIsApproved(true);
    }
  }, [needAllowance]);

  return { write, isApproved };
};

interface CancelOrderProps {
  index: BigNumber;
  price: BigNumber;
}

export const useCancelOrder = ({ index, price }: CancelOrderProps) => {
  const [pool] = usePoolStore((state) => [state.pool]);
  const { config } = usePreparePoolCancelOrder({
    address: pool.address as `0x${string}`,
    args: [index, price],
  });
  const { write: cancel, data: writeData } = usePoolCancelOrder({
    ...config,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // const { data: waitedData } =
  useWaitForTransaction({
    hash: writeData?.hash,
    onSuccess: (data) => {
      toast.success(
        <TransactionToast
          text="Order canceled successfully."
          hash={data.transactionHash}
        />
      );
    },
  });
  return { cancel };
};

interface FulfillOrderProps {
  amount: BigNumber;
  minReceived: BigNumber;
  maxPaid: BigNumber;
  pool: Pool;
}

export const useFulfillOrder = ({
  amount,
  minReceived,
  maxPaid,
  pool,
}: FulfillOrderProps) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(Date.now() * 1000 + 120);
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const { address } = useAccount();

  const { config } = usePreparePoolFulfillOrder({
    address: pool.address,
    args: [
      amount,
      address as `0x${string}`,
      minReceived,
      maxPaid,
      utils.parseUnits(time.toString(), 0),
    ],
    enabled: !!address && !amount.isZero(),
  });

  const { data: writeData, write } = usePoolFulfillOrder({
    ...config,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // const { data: waitedData } =
  useWaitForTransaction({
    hash: writeData?.hash,
    onSuccess: (data) => {
      toast.success(
        <TransactionToast
          text="Order fulfilled successfully."
          hash={data.transactionHash}
        />
      );
    },
  });

  return { write };
};
