import { QueryClient } from "@tanstack/react-query";
import { BigNumber } from "ethers";
import { Address0x, OpenOrderEvent } from "@/types";

export const updateOrderFromPendingToOpen = (
  queryClient: QueryClient,
  address: Address0x,
  poolAddress: string,
  rest: [string, ...BigNumber[]]
) => {
  queryClient.setQueryData<OpenOrderEvent[]>(
    ["userOrderCreatedEvent", address, poolAddress],
    (prev) => {
      if (!prev) return;

      const [offerer, price, orderIndex] = rest;

      if (offerer !== address) return prev;

      return prev.map((item) => {
        if (item.rawPrice.eq(price) && item.status === "pending") {
          return {
            ...item,
            status: "open",
            index: orderIndex,
          };
        } else {
          return item;
        }
      });
    }
  );
};

export const removeCanceledOrder = (
  queryClient: QueryClient,
  address: Address0x,
  poolAddress: string,
  price: BigNumber,
  index: BigNumber
) => {
  queryClient.setQueryData<OpenOrderEvent[]>(
    ["userOrderCreatedEvent", address, poolAddress],
    (prev) => {
      if (!prev) return;

      const canceledOrder = prev.find(
        (i) => i.rawPrice.eq(price) && i.index.eq(index)
      );

      if (canceledOrder) {
        const copyOrders = [...prev];
        copyOrders.splice(copyOrders.indexOf(canceledOrder), 1);

        return copyOrders;
      }

      return prev;
    }
  );
};
