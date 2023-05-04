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

      return prev.map((item) => {
        if (item.rawPrice.eq(price) && item.status === "pending") {
          console.log("order found");

          return {
            ...item,
            status: "open",
            index: orderIndex,
          };
        } else {
          console.log("order not found");
          return item;
        }
      });

      // const foundOrderIndex = prev.findIndex((i) => {
      //   return i.rawPrice.eq(price) && i.status === "pending";
      // });

      // if (foundOrderIndex !== -1) {
      //   console.log("order found");

      //   const order: OpenOrderEvent = {
      //     ...prev[foundOrderIndex],
      //     status: "open",
      //     index: orderIndex,
      //   };
      //   const copyOrders = [...prev];
      //   copyOrders[foundOrderIndex] = order;
      //   return copyOrders;
      // }

      //     console.log("order not found");

      // return prev;
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
