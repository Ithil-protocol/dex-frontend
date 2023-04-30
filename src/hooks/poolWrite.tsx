import { utils, BigNumber } from "ethers";
import { useLayoutEffect, useState } from "react";
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
import {
  useBuyAmountConverter,
  useBuyPriceConverter,
  useBuyStakeConverter,
  useSellAmountConverter,
  useSellPriceConverter,
  useSellStakeConverter,
} from "./converters";
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
  });

  const queryClient = useQueryClient();
  const buyAmountConverter = useBuyAmountConverter();
  const buyPriceConverter = useBuyPriceConverter();
  const sellAmountConverter = useSellAmountConverter();
  const sellPriceConverter = useSellPriceConverter();
  const buyStakeConverter = useBuyStakeConverter();
  const sellStakeConverter = useSellStakeConverter();
  const side = usePoolStore((state) => state.side);
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

      const { transactionHash, transactionIndex } = await args[0].wait();

      queryClient.setQueryData<OpenOrderEvent[]>(
        ["userOrderCreatedEvent"],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        (prev) => {
          if (!prev) return undefined;

          return [
            {
              address: address as `0x${string}`,
              amount: converters[side].amount(amount, price),
              index: transactionIndex,
              price: converters[side].price(price),
              rawAmount: amount,
              rawPrice: price,
              rawStaked: boost,
              side,
              staked: converters[side].stake(boost),
              status: "pending",
              timestamp: Date.now(),
              transactionHash,
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
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

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
  index: BigNumber;
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
    args: [index, price],
  });
  const { write: cancel, data: writeData } = usePoolCancelOrder({
    ...config,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const queryClient = useQueryClient();

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
        ["userOrderCreatedEvent"],
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
        ["userOrderCancelledEvents", address],
        (orders) => {
          if (!orders || !canceledOrder) return;

          const { address, index, ...rest } = canceledOrder;

          const newOrders: HistoryEvent[] = [
            {
              ...rest,
              status: "canceled",
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
