import { utils, BigNumber } from "ethers";
import { useEffect, useState } from "react";
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
    enabled: amount.toNumber() > 0 && price.toNumber() > 0 && !!address,
    onError: (error) => {
      toast.error(error.message.substring(0, 200));
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
  const [test, setTest] = useState(1.01);
  const { address } = useAccount();
  const { data: allowanceValue } = useTokenAllowance({
    address: pool.underlying.address,
    args: [address as `0x${string}`, pool.address],
    enabled: !!address,
    watch: true,
  });
  // console.log(allowanceValue);
  // allowanceValue &&
  //   console.log(
  //     Number(utils.formatUnits(allowanceValue, pool.underlying.decimals))
  //   );
  const needAllowance = () => {
    if (allowanceValue) {
      return (
        Number(utils.formatUnits(allowanceValue, pool.underlying.decimals)) <
        Number(amount)
      );
    }
    return false;
  };
  const { config, refetch } = usePrepareTokenApprove({
    address: pool.underlying.address as `0x${string}`,
    args: [
      pool.address as `0x${string}`,
      utils.parseUnits(
        (Number(amount) * test || 0).toFixed(pool.underlying.decimals),
        pool.underlying.decimals
      ),
    ],
    enabled: needAllowance(),
    cacheTime: 0,
  });
  const { write, data: writeData } = useTokenApprove({
    ...config,
    onError: (error) => {
      toast.error(error.message);
    },
    onSettled: () => {
      refetch();
    },
  });

  // const { data: waitedData } =
  useWaitForTransaction({
    hash: writeData?.hash,
    onSuccess: (data) => {
      setTest((prevState) => (prevState === 1.01 ? 1.01 : 1.001));
      toast.success(
        <TransactionToast
          text="Contract approved successfully."
          hash={data.transactionHash}
        />
      );
    },
  });

  return { write };

  // const { data, write } = useTokenApprove(config);
  // const [isApproved, setIsApproved] = useState();
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
    enabled: !!address && amount.toNumber() > 0,
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
