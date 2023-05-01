import { utils, ethers, BigNumber } from "ethers";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import {
  usePrepareTokenApprove,
  useTokenAllowance,
  useTokenApprove,
} from "./contracts/token";
import TransactionToast from "components/Common/Toast/TransactionToast";
import { HistoryEvent, OpenOrderEvent, Pool, Token } from "types";
import { useDeadline } from "./useDeadline";
import { useQueryClient } from "@tanstack/react-query";
import { useGetConverters } from "./converters";
import { usePoolStore } from "store";

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
  const time = useDeadline();
  const transactionHashRef = useRef("");

  const { address } = useAccount();
  const { config, isLoading: gasLoading } = usePreparePoolCreateOrder({
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
    onError: (_error) => {
      // toast.error(error.message.substring(0, 200));
    },
    // onSuccess(...args) {},
  });

  const [{ address: poolAddress }, side] = usePoolStore((state) => [
    state.default,
    state.side,
  ]);
  const queryClient = useQueryClient();
  const {
    buyAmountConverter,
    buyPriceConverter,
    buyStakeConverter,
    sellAmountConverter,
    sellPriceConverter,
    sellStakeConverter,
  } = useGetConverters();
  const {
    data: writeData,
    write,
    isLoading: writeLoading,
  } = usePoolCreateOrder({
    ...config,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (...args) => {
      const converters = {
        buy: {
          amount: buyAmountConverter,
          price: buyPriceConverter,
          stake: buyStakeConverter,
        },
        sell: {
          amount: sellAmountConverter,
          price: sellPriceConverter,
          stake: sellStakeConverter,
        },
      };

      queryClient.setQueryData<OpenOrderEvent[]>(
        ["userOrderCreatedEvent", poolAddress],
        (prev) => {
          if (!prev) return;

          transactionHashRef.current = args[0].hash;
          return [
            {
              address: address as `0x${string}`,
              amount: converters[side].amount(amount, price),
              index: -1,
              price: converters[side].price(price),
              rawAmount: amount,
              rawPrice: price,
              rawStaked: boost,
              side,
              staked: converters[side].stake(boost),
              status: "pending",
              timestamp: Date.now(),
              transactionHash: transactionHashRef.current,
            },
            ...prev,
          ];
        }
      );
    },
  });

  const { data: waitedData, isLoading: waitLoading } = useWaitForTransaction({
    hash: writeData?.hash,
    onSuccess: (data) => {
      toast.success(
        <TransactionToast
          text="Order created successfully."
          hash={data.transactionHash}
        />
      );

      queryClient.setQueryData<OpenOrderEvent[]>(
        ["userOrderCreatedEvent", poolAddress],
        (prev) => {
          if (!prev) return;

          const index = prev?.findIndex(
            (i) => i.transactionHash === data.transactionHash
          );

          if (index !== -1) {
            const order = { ...prev[index] };
            order.status = "open";
            order.index = -1;

            const copyOrders = [...prev];
            copyOrders.splice(index, 1, order);
            return copyOrders;
          }

          return prev;
        }
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (waitedData?.transactionIndex) {
      queryClient.setQueryData<OpenOrderEvent[]>(
        ["userOrderCreatedEvent", poolAddress],
        (prev) => {
          if (!prev) return;

          const index = prev?.findIndex(
            (i) => i.transactionHash === transactionHashRef.current
          );

          if (index !== -1) {
            const order = { ...prev[index] };

            order.index = ethers.BigNumber.from(waitedData.transactionIndex);

            const copyOrders = [...prev];
            copyOrders.splice(index, 1, order);

            return copyOrders;
          }

          return prev;
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waitedData]);

  return {
    waitedData,
    write,
    isLoading: writeLoading || waitLoading,
    gasLoading,
  };
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
  // allowanceValue &&
  //   console.log(
  //     "allowance:",
  //     token.address,
  //     Number(utils.formatUnits(allowanceValue, token.decimals))
  //   );
  const currentAllowance = allowanceValue
    ? utils.formatUnits(allowanceValue, token.decimals)
    : "0";

  const needAllowance = Number(currentAllowance) < Number(amount);

  const { config } = usePrepareTokenApprove({
    address: token.address,
    args: [
      pool.address,
      utils.parseUnits(Number(amount).toFixed(token.decimals), token.decimals),
    ],
    overrides: {
      gasLimit: utils.parseUnits("200000", 0),
    },
    enabled: needAllowance,
    cacheTime: 0,
  });

  const {
    write,
    data: writeData,
    isLoading: writeLoading,
  } = useTokenApprove({
    ...config,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { isLoading: waitLoading } = useWaitForTransaction({
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

  return {
    write,
    isApproved,
    isLoading: writeLoading || waitLoading,
    currentAllowance,
  };
};

interface CancelOrderProps {
  hash: string;
  index: BigNumber | -1;
  pool: Pool;
  price: BigNumber;
}

export const useCancelOrder = ({
  index,
  price,
  pool,
  hash,
}: CancelOrderProps) => {
  const { address } = useAccount();
  const { config } = usePreparePoolCancelOrder({
    address: pool.address as `0x${string}`,
    args: [index as BigNumber, price],
  });
  const { write: cancel, data: writeData } = usePoolCancelOrder({
    ...config,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const queryClient = useQueryClient();
  const { address: poolAddress } = usePoolStore((state) => state.default);

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

      let canceledOrder: OpenOrderEvent | undefined;

      queryClient.setQueryData<OpenOrderEvent[]>(
        ["userOrderCreatedEvent", poolAddress],
        (orders) => {
          if (!orders) return;

          canceledOrder = orders.find((i) => i.transactionHash === hash);

          if (canceledOrder) {
            const copyOrders = [...orders];
            copyOrders.splice(copyOrders.indexOf(canceledOrder), 1);

            return copyOrders;
          }

          return orders;
        }
      );

      queryClient.setQueryData<HistoryEvent[]>(
        ["userOrderCancelledEvents", address, poolAddress],
        (orders) => {
          if (!orders || !canceledOrder) return;

          const { address, index, ...rest } = canceledOrder;

          const newOrders: HistoryEvent[] = [
            {
              ...rest,
              status: "canceled",
              timestamp: Date.now(),
            },
            ...orders,
          ];

          return newOrders;
        }
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
  const time = useDeadline();

  const { address } = useAccount();

  const { config, isLoading: gasLoading } = usePreparePoolFulfillOrder({
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

  const {
    data: writeData,
    write,
    isLoading: writeLoading,
  } = usePoolFulfillOrder({
    ...config,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // const { data: waitedData } =
  const { isLoading: waitLoading } = useWaitForTransaction({
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

  return { write, isLoading: writeLoading || waitLoading, gasLoading };
};
