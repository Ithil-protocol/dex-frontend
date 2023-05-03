import { useQueryClient } from "@tanstack/react-query";
import { OpenOrderEvent, Status } from "@/types";

export const useChangeOrderStatus = (
  address: string,
  poolAddress: string,
  transactionHash: string
) => {
  const queryClient = useQueryClient();

  return (status: Status) => {
    queryClient.setQueryData<OpenOrderEvent[]>(
      ["userOrderCreatedEvent", address, poolAddress],
      (prev) => {
        if (!prev) return;

        const index = prev.findIndex(
          (i) => i.transactionHash === transactionHash
        );

        if (index > -1) {
          const order = { ...prev[index] };
          const copyOrders = [...prev];
          copyOrders.splice(index, 1, {
            ...order,
            status,
          });
          return copyOrders;
        }

        return prev;
      }
    );
  };
};
