import { utils, BigNumber, constants, providers } from "ethers";
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
import { HistoryEvent, OpenOrderEvent, Pool, Side, Token } from "types";
import { useDeadline } from "./useDeadline";
import { useQueryClient } from "@tanstack/react-query";
import { useGetConverters } from "./converters";
import { usePoolStore } from "store";
import { useReadPreviewOrder } from "store/web3Store";

interface CreateOrderProps {
  amount: BigNumber;
  boost: BigNumber;
  pool: Pool;
  price: BigNumber;
  side: Side;
}
export const useCreateOrder = ({
  amount,
  boost,
  pool,
  price,
  side,
}: CreateOrderProps) => {
  const time = useDeadline();

  const { address } = useAccount();
  const previewData = useReadPreviewOrder(pool.address, price, boost);

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

  const { address: poolAddress } = usePoolStore((state) => state.default);
  const queryClient = useQueryClient();
  const {
    buyAmountConverter,
    buyPriceConverter,
    sellAmountConverter,
    sellPriceConverter,
    stakedConverter,
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
          stake: stakedConverter,
        },
        sell: {
          amount: sellAmountConverter,
          price: sellPriceConverter,
          stake: stakedConverter,
        },
      };

      queryClient.setQueryData<OpenOrderEvent[]>(
        ["userOrderCreatedEvent", address, poolAddress],
        (prev) => {
          if (!prev) return;
          if (!previewData) return;

          console.log(
            "converting position to index:",
            previewData.position.add(constants.One)
          );

          return [
            {
              address: address as `0x${string}`,
              amount: converters[side].amount(amount, price),
              index: previewData.position.add(constants.One),
              price: converters[side].price(previewData.actualPrice),
              rawAmount: amount,
              rawPrice: previewData.actualPrice,
              rawStaked: boost,
              side,
              staked: converters[side].stake(boost),
              status: "pending",
              timestamp: Date.now(),
              transactionHash: args[0].hash,
            },
            ...prev,
          ];
        }
      );
    },
  });

  const {
    data: waitedData,
    isLoading: waitLoading,
    isError,
    isSuccess,
  } = useWaitForTransaction({
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
    waitedData: {
      ...waitedData,
      transactionHash: writeData?.hash ?? constants.HashZero,
    } as providers.TransactionReceipt,
    waitedError: isError,
    waitedSuccess: isSuccess,
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
  hash,
  index,
  pool,
  price,
}: CancelOrderProps) => {
  const queryClient = useQueryClient();
  const { address } = useAccount();
  const { address: poolAddress } = usePoolStore((state) => state.default);

  const { config } = usePreparePoolCancelOrder({
    address: pool.address as `0x${string}`,
    args: [index as BigNumber, price],
  });

  const { write: cancel, data: writeData } = usePoolCancelOrder({
    ...config,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess() {
      queryClient.setQueryData<HistoryEvent[]>(
        ["userOrderCreatedEvent", address, poolAddress],
        (prev) => {
          if (!prev) return;

          const index = prev.findIndex((i) => i.transactionHash === hash);

          if (index > -1) {
            const order = { ...prev[index] };
            const copyOrders = [...prev];
            copyOrders.splice(index, 1, {
              ...order,
              status: "canceling",
            });
            return copyOrders;
          }

          return prev;
        }
      );
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
    onError() {
      queryClient.setQueryData<HistoryEvent[]>(
        ["userOrderCreatedEvent", address, poolAddress],
        (prev) => {
          if (!prev) return;

          const index = prev.findIndex((i) => i.transactionHash === hash);

          if (index > -1) {
            const copyOrders = [...prev];
            copyOrders.splice(index, 1);
            return copyOrders;
          }

          return prev;
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
    isError,
    isSuccess,
  } = usePoolFulfillOrder({
    ...config,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { data: waitedData, isLoading: waitLoading } = useWaitForTransaction({
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

  return {
    waitedData: {
      ...waitedData,
      transactionHash: writeData?.hash ?? constants.HashZero,
    } as providers.TransactionReceipt,
    waitedError: isError,
    waitedSuccess: isSuccess,
    write,
    isLoading: writeLoading || waitLoading,
    gasLoading,
  };
};
