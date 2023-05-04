import { BigNumber, constants } from "ethers";
import { usePoolPreviewOrder } from "@/hooks/contracts/pool";
import { OpenOrderEvent, Side } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useGetConverters } from "@/hooks/converters";
import { usePoolStore } from "@/store";

interface CreatePendingOrderArgs {
  address: string;
  amount: BigNumber;
  boost: BigNumber;
  price: BigNumber;
  side: Side;
}

export const useCreatePendingOrder = ({
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
