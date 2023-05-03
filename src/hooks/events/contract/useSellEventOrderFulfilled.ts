import { useQueryClient } from "@tanstack/react-query";
import { Event } from "ethers";
import { sell_volume } from "hooks/contract";
import { useGetConvertersBySide } from "hooks/converters";
import { usePoolStore } from "store";
import { contractABI } from "store/abi";
import { HistoryEvent, MarketEvent, OrderBook } from "types";
import { useAccount, useContractEvent } from "wagmi";

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

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const data = rest[6]! as Event;
      const { value: rawStaked } = await data.getTransaction();

      queryClient.setQueryData<HistoryEvent[]>(
        ["userOrderFulfilledEvents", address, poolAddress],
        (prev) => {
          if (!prev) return;

          const [, offerer, fulfiller, rawAmount, rawPrice] = rest;

          if (offerer === address || fulfiller === address) {
            return [
              {
                amount: amountConverter(rawAmount, rawPrice),
                price: priceConverter(rawPrice),
                rawAmount,
                rawPrice,
                rawStaked,
                side: "sell",
                staked: stakedConverter(rawStaked),
                status: "fulfilled",
                timestamp: Date.now(),
                transactionHash: data.transactionHash,
              },
              ...prev,
            ];
          }

          return prev;
        }
      );
    },
  });
};
