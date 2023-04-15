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

interface CreateOrderProps {
  amount: number | string;
  price: number | string;
  boost: number | string;
}

export const useCreateOrder = ({
  amount = 0,
  price = 0,
  boost = 0,
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
  const [pool] = usePoolStore((state) => [state.pool]);
  const { config } = usePreparePoolCreateOrder({
    address: pool.address as `0x${string}`,
    args: [
      utils.parseUnits(Number(amount).toString(), pool.underlying.decimals),
      utils.parseUnits(Number(price).toString(), pool.accounting.decimals),
      address as `0x${string}`,
      utils.parseUnits(time.toString(), 0),
    ],
    overrides: {
      value: utils.parseUnits(Number(boost).toString(), 18),
    },
    enabled: Number(amount) > 0 && Number(price) > 0 && !!address,
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
        <p>
          Order created successfully.
          <br />
          <Link
            target="_blank"
            href={`https://goerli.etherscan.io/tx/${data.transactionHash}`}
          >
            Check on Etherscan!
          </Link>
        </p>
      );
    },
  });

  return { waitedData, write };
};

interface FulfillOrderProps {
  amount: number | string;
}

export const useFulfillOrder = ({ amount = 0 }: FulfillOrderProps) => {
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
  const [pool] = usePoolStore((state) => [state.pool]);

  const { config } = usePreparePoolFulfillOrder({
    address: pool.address as `0x${string}`,
    args: [
      utils.parseUnits(
        Number(amount).toFixed(pool.underlying.decimals),
        pool.underlying.decimals
      ),
      address as `0x${string}`,
      utils.parseUnits(
        (Number(amount) / 2.5).toFixed(pool.underlying.decimals),
        pool.underlying.decimals
      ),
      utils.parseUnits(time.toString(), 0),
    ],
    enabled: !!address && Number(amount) > 0,
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
        <p>
          Order fulfilled successfully.
          <br />
          <Link
            target="_blank"
            href={`https://goerli.etherscan.io/tx/${data.transactionHash}`}
          >
            Check on Etherscan!
          </Link>
        </p>
      );
    },
  });

  return { write };
};

interface AllowanceProps {
  amount: number;
}
export const useAllowance = ({ amount = 0 }: AllowanceProps) => {
  const [test, setTest] = useState(1.01);
  const { address } = useAccount();
  const [pool] = usePoolStore((state) => [state.pool]);
  const { data: allowanceValue } = useTokenAllowance({
    address: pool.underlying.address as `0x${string}`,
    args: [address as `0x${string}`, pool.address as `0x${string}`],
    enabled: !!address,
    watch: true,
  });
  console.log(allowanceValue);
  allowanceValue &&
    console.log(
      Number(utils.formatUnits(allowanceValue, pool.underlying.decimals))
    );
  const needAllowance = () => {
    if (allowanceValue) {
      return (
        Number(utils.formatUnits(allowanceValue, pool.underlying.decimals)) <
        amount
      );
    }
    return false;
  };
  const { config, refetch } = usePrepareTokenApprove({
    address: pool.underlying.address as `0x${string}`,
    args: [
      pool.address as `0x${string}`,
      utils.parseUnits(
        (amount * test || 0).toFixed(pool.underlying.decimals),
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
        <p>
          Contract approved successfully.
          <br />
          <Link
            target="_blank"
            href={`https://goerli.etherscan.io/tx/${data.transactionHash}`}
          >
            Check on Etherscan!
          </Link>
        </p>
      );
    },
  });
  console.log(write);

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
        <p>
          Order canceled successfully.
          <br />
          <Link
            target="_blank"
            href={`https://goerli.etherscan.io/tx/${data.transactionHash}`}
          >
            Check on Etherscan!
          </Link>
        </p>
      );
    },
  });
  return { cancel };
};
