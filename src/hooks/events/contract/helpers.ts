import { QueryClient } from "@tanstack/react-query";
import { BigNumber } from "ethers";
import { OpenOrderEvent } from "@/types";

export const updateOrderFromPendingToOpen = (
  queryClient: QueryClient,
  address: string,
  poolAddress: string,
  rest: [string, ...BigNumber[]]
) => {
  queryClient.setQueryData<OpenOrderEvent[]>(
    ["userOrderCreatedEvent", address, poolAddress],
    (prev) => {
      if (!prev) return;

      const [offerer, price, orderIndex] = rest;

      if (offerer !== address) return prev;

      const index = prev.findIndex((i) => {
        return i.rawPrice.eq(price) && orderIndex.gte(i.index);
      });

      if (index !== -1) {
        const order = { ...prev[index] };
        order.status = "open";
        order.index = orderIndex;

        const copyOrders = [...prev];
        copyOrders.splice(index, 1, order);
        return copyOrders;
      }

      return prev;
    }
  );
};

export const removeCanceledOrder = (
  queryClient: QueryClient,
  address: string,
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