import { utils, BigNumber, constants, providers } from "ethers";
import { useAccount, useWaitForTransaction } from "wagmi";
import {
  usePoolCreateOrder,
  usePoolPreviewOrder,
  usePreparePoolCreateOrder,
} from "@/hooks/contracts/pool";
import { toast } from "react-toastify";
import TransactionToast from "@/components/Common/Toast/TransactionToast";
import { OpenOrderEvent, Pool, Side } from "@/types";
import { useDeadline } from "@/hooks/useDeadline";
import { useQueryClient } from "@tanstack/react-query";
import { useGetConverters } from "@/hooks/converters";
import { usePoolStore } from "@/store";
import { useRef } from "react";
import { useChangeOrderStatus } from "./useChangeOrderStatus";

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
  const transactionHash = useRef("");
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

  const createPendingOrder = useCreatePendingOrder({
    price,
    amount,
    boost,
    address: address as string,
    side,
  });
  const changeOrderStatus = useChangeOrderStatus(
    address as string,
    pool.address,
    transactionHash.current
  );

  const {
    data: writeData,
    write,
    isLoading: writeLoading,
  } = usePoolCreateOrder({
    ...config,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (...args) => {
      transactionHash.current = args[0].hash;
      createPendingOrder(transactionHash.current);
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
      changeOrderStatus("error");
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

interface CreatePendingOrderArgs {
  address: string;
  amount: BigNumber;
  boost: BigNumber;
  price: BigNumber;
  side: Side;
}

const useCreatePendingOrder = ({
  address,
  amount,
  boost,
  price,
  side,
}: CreatePendingOrderArgs) => {
  const { address: poolAddress } = usePoolStore((state) => state.default);
  const { data: previewData } = usePoolPreviewOrder({
    address: poolAddress,
    args: [price, boost],
  });
  const queryClient = useQueryClient();
  const {
    buyAmountConverter,
    buyPriceConverter,
    sellAmountConverter,
    sellPriceConverter,
    stakedConverter,
  } = useGetConverters();

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

  return (transactionHash: string) => {
    queryClient.setQueryData<OpenOrderEvent[]>(
      ["userOrderCreatedEvent", address, poolAddress],
      (prev) => {
        if (!prev) return;
        if (!previewData) return;

        return [
          {
            address: address as `0x${string}`,
            amount: converters[side].amount(amount, price),
            index: constants.NegativeOne,
            price: converters[side].price(previewData.actualPrice),
            rawAmount: amount,
            rawPrice: previewData.actualPrice,
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
  };
};
