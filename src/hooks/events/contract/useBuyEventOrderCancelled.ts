import { useQueryClient } from "@tanstack/react-query";
import { Event } from "ethers";
import { useGetConvertersBySide } from "@/hooks/converters";
import { usePoolStore } from "@/store";
import { contractABI } from "@/store/abi";
import { BigNumberValue, HistoryEvent, OrderBook } from "@/types";
import { useAccount, useContractEvent } from "wagmi";
import { removeCanceledOrder } from "./helpers";
import { buy_volume } from "@/data/constants";

export const useBuyEventOrderCancelled = () => {
  const { address } = useAccount();

  const [buyPool, { address: poolAddress }] = usePoolStore((state) => [
    state.buyPool,
    state.default,
  ]);
  const { amountConverter, priceConverter, stakedConverter } =
    useGetConvertersBySide("buy");

  const queryClient = useQueryClient();

  useContractEvent({
    address: buyPool.address,
    abi: contractABI,
    eventName: "OrderCancelled",
    async listener(...rest) {
      const [index, offerer, price, amount] = rest;

      queryClient.setQueryData<OrderBook[]>(
        [buy_volume, buyPool.address],
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
              side: "buy",
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
        address as BigNumberValue,
        poolAddress,
        price,
        index
      );
    },
  });
};
