import { Event } from "ethers";
import { buy_volume } from "hooks/contract";
import { useGetConverters } from "hooks/converters";
import { usePoolStore } from "store";
import { contractABI } from "store/abi";
import { HistoryEvent, MarketEvent, OrderBook } from "types";
import { useAccount, useContractEvent, useQueryClient } from "wagmi";

export const useBuyEventOrderFulfilled = () => {
  const { address } = useAccount();
  const queryClient = useQueryClient();

  const [buyPool, { address: poolAddress }] = usePoolStore((state) => [
    state.buyPool,
    state.default,
  ]);
  const { buyAmountConverter, buyPriceConverter, buyStakeConverter } =
    useGetConverters();

  useContractEvent({
    address: buyPool.address,
    abi: contractABI,
    eventName: "OrderFulfilled",
    async listener(...rest) {
      const price = rest[4];
      const amount = rest[3];
      queryClient.setQueryData<OrderBook[]>(
        [buy_volume, buyPool.address],
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
              amount: buyAmountConverter(amount, price),
              price: buyPriceConverter(price),
              side: "buy",
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
                amount: buyAmountConverter(rawAmount, rawPrice),
                price: buyPriceConverter(rawPrice),
                rawAmount,
                rawPrice,
                rawStaked,
                side: "buy",
                staked: buyStakeConverter(rawStaked),
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
