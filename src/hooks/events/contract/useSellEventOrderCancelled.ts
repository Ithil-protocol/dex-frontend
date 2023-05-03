import { useQueryClient } from "@tanstack/react-query";
import { Event } from "ethers";
import { localConstants } from "@/variables";
import { useGetConvertersBySide } from "@/hooks/converters";
import { usePoolStore } from "@/store";
import { contractABI } from "@/store/abi";
import { HistoryEvent, OrderBook } from "@/types";
import { useAccount, useContractEvent } from "wagmi";
import { removeCanceledOrder } from "./helpers";

export const useSellEventOrderCancelled = () => {
  const { address } = useAccount();

  const [sellPool, { address: poolAddress }] = usePoolStore((state) => [
    state.sellPool,
    state.default,
  ]);
  const { amountConverter, priceConverter, stakedConverter } =
    useGetConvertersBySide("sell");

  const queryClient = useQueryClient();

  useContractEvent({
    address: sellPool.address,
    abi: contractABI,
    eventName: "OrderCancelled",
    async listener(...rest) {
      const [index, offerer, price, amount] = rest;

      queryClient.setQueryData<OrderBook[]>(
        [localConstants.sell_volume, sellPool.address],
        (prev) => {
          if (!prev) return;

          return prev.map((item) => {
            if (item.value.eq(price)) {
              return {
                ...item,
                volume: item.volume.sub(amount),
              };
            }
            return item;
          });
        }
      );

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const data = rest[4]! as Event;
      const { value: rawStaked } = await data.getTransaction();

      queryClient.setQueryData<HistoryEvent[]>(
        ["userOrderCancelledEvents", address, poolAddress],
        (prev) => {
          if (!prev) return;
          if (offerer !== address) return prev;

          const newOrders: HistoryEvent[] = [
            {
              status: "canceled",
              timestamp: Date.now(),
              amount: amountConverter(amount, price),
              price: priceConverter(price),
              rawAmount: amount,
              rawPrice: price,
              rawStaked,
              side: "sell",
              staked: stakedConverter(rawStaked),
              transactionHash: data.transactionHash,
            },
            ...prev,
          ];

          return newOrders;
        }
      );

      removeCanceledOrder(
        queryClient,
        address as string,
        poolAddress,
        price,
        index
      );
    },
  });
};
