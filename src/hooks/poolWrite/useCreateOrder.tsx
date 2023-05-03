import { utils, BigNumber, constants, providers } from "ethers";
import { useAccount, useWaitForTransaction } from "wagmi";
import {
  usePoolCreateOrder,
  usePreparePoolCreateOrder,
} from "../contracts/pool";
import { toast } from "react-toastify";
import TransactionToast from "components/Common/Toast/TransactionToast";
import { OpenOrderEvent, Pool, Side } from "types";
import { useDeadline } from "../useDeadline";
import { useQueryClient } from "@tanstack/react-query";
import { useGetConverters } from "../converters";
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
