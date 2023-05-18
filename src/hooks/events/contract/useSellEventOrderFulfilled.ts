import { useQueryClient } from "@tanstack/react-query";
import { Event } from "ethers";
import { useGetConvertersBySide } from "@/hooks/converters";
import { usePoolStore } from "@/store";
import { contractABI } from "@/store/abi";
import { HistoryEvent, MarketEvent, OpenOrderEvent, OrderBook } from "@/types";
import { useAccount, useContractEvent } from "wagmi";
import { sell_volume } from "@/data/constants";
import { sellAmountConverter } from "@/utility/converters";

export const useSellEventOrderFulfilled = () => {
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
    eventName: "OrderFulfilled",
    async listener(...rest) {
      const offerer = rest[1];
      const orderIndex = rest[0];
      const price = rest[4];
      const amount = rest[3];
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

      queryClient.setQueryData<MarketEvent[]>(
        ["allOrderFulfilledEvents", poolAddress],
        (prev) => {
          if (!prev) return;

          return [
            {
              amount: amountConverter(amount, price),
              price: priceConverter(price),
              side: "sell",
              timestamp: Date.now(),
            },
            ...prev,
          ];
        }
      );

      //@ts-ignore
      const data = rest[6]! as Event;
      const { value: rawStaked } = await data.getTransaction();

      queryClient.setQueryData<HistoryEvent[]>(
        ["userOrderFulfilledEvents", address, poolAddress],
        (prev) => {
          if (!prev) return;

          const [, offerer, fulfiller, rawAmount, rawPrice, totalFill] = rest;

          if (offerer === address || fulfiller === address) {
            return [
              {
                amount: amountConverter(rawAmount, rawPrice),
                price: priceConverter(rawPrice),
                rawAmount,
                rawPrice,
                rawStaked,
                side: offerer === address ? "sell" : "buy",
                staked: stakedConverter(rawStaked),
                status: totalFill ? "fulfilled" : "partially filled",
                timestamp: Date.now(),
                transactionHash: data.transactionHash,
              },
              ...prev,
            ];
          }

          return prev;
        }
      );

      queryClient.setQueryData<OpenOrderEvent[]>(
        ["userOrderCreatedEvent", address, poolAddress],
        (prev) => {
          if (!prev) return;

          return prev
            .map((order) => {
              //BUG: index is zero in last fulfill event if it filled partially first:solved
              const isItemExist =
                order.rawPrice.eq(price) && order.index.eq(orderIndex);
              // const isItemExist =
              //   order.rawPrice.eq(price) && address === offerer;

              if (isItemExist) {
                const newRawExecuted = order.rawExecuted.add(amount);
                const executed = sellAmountConverter(newRawExecuted, sellPool);

                return {
                  ...order,
                  executed,
                  rawExecuted: newRawExecuted,
                };
              }
              return order;
            })
            .filter((item) => !item.rawAmount.eq(item.rawExecuted));
        }
      );
    },
  });
};
