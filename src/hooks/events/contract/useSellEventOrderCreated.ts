import { contractABI } from "@/store/abi";
import { useQueryClient } from "@tanstack/react-query";
import { usePoolStore } from "@/store";
import { BigNumberValue, OrderBook } from "@/types";
import { useAccount, useContractEvent } from "wagmi";
import { updateOrderFromPendingToOpen } from "./helpers";
import { sell_volume } from "@/data/constants";

export const useSellEventOrderCreated = () => {
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const [sellPool, { address: poolAddress }] = usePoolStore((state) => [
    state.sellPool,
    state.default,
  ]);

  useContractEvent({
    address: sellPool.address,
    abi: contractABI,
    eventName: "OrderCreated",
    listener(...rest) {
      const price = rest[1];
      const amount = rest[3];
      queryClient.setQueryData<OrderBook[]>(
        [sell_volume, sellPool.address],
        (prev) => {
          if (!prev) return;
          const index = prev.findIndex((item) => item.value.eq(price));
          const newArray = [...prev];
          if (index > -1) {
            newArray[index] = {
              ...newArray[index],
              volume: newArray[index].volume.add(amount),
            };
          } else {
            newArray.push({
              value: price,
              volume: amount,
              type: "sell" as const,
            });
            newArray.sort((a, b) => {
              if (b.value.gt(a.value)) return 1;
              else if (b.value.lt(a.value)) return -1;
              else return 0;
            });
          }

          return newArray;
        }
      );

      updateOrderFromPendingToOpen(
        queryClient,
        address as BigNumberValue,
        poolAddress,
        rest
      );
    },
  });
};
