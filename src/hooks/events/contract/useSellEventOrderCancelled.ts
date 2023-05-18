import { useQueryClient } from "@tanstack/react-query";
import { Event } from "ethers";
import { useGetConvertersBySide } from "@/hooks/converters";
import { usePoolStore } from "@/store";
import { contractABI } from "@/store/abi";
import { Address0x, HistoryEvent, OrderBook } from "@/types";
import { useAccount, useContractEvent } from "wagmi";
import { removeCanceledOrder } from "./helpers";
import { sell_volume } from "@/data/constants";

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
        [sell_volume, sellPool.address],
        (prev) => {
          if (!prev) return;

          return prev.map((item) => {
            if (item.value.eq(price)) {
              return {
                ...item,
                volume: item.volume.sub(amount),
                animated: false,
              };
            }
            return item;
          });
        }
      );

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
        address as Address0x,
        poolAddress,
        price,
        index
      );
    },
  });
};
