import { contractABI } from "@/store/abi";
import { useQueryClient } from "@tanstack/react-query";
import { usePoolStore } from "@/store";
import { useAccount, useContractEvent } from "wagmi";
import { Address0x, OrderBook } from "@/types";
import { updateOrderFromPendingToOpen } from "./helpers";
import { buy_volume } from "@/data/constants";

export const useBuyEventOrderCreated = () => {
  const { address } = useAccount();
  const queryClient = useQueryClient();
  const [buyPool, { address: poolAddress }] = usePoolStore((state) => [
    state.buyPool,
    state.default,
  ]);

  useContractEvent({
    address: buyPool.address,
    abi: contractABI,
    eventName: "OrderCreated",
    listener(...rest) {
      const price = rest[1];
      const amount = rest[3];
      queryClient.setQueryData<OrderBook[]>(
        [buy_volume, buyPool.address],
        (prev) => {
          if (!prev) return;
          const index = prev.findIndex((item) => item.value.eq(price));
          const newArray = [...prev];
          if (index > -1) {
            newArray[index] = {
              ...newArray[index],
              volume: newArray[index].volume.add(amount),
              animated: false,
            };
          } else {
            newArray.push({
              value: price,
              volume: amount,
              type: "buy" as const,
              animated: false,
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
        address as Address0x,
        poolAddress,
        rest
      );
    },
  });
};
