import {
  useUserOrderCancelledEvents,
  useUserOrderFulfilledEvents,
} from "hooks/events";

import OrderHistoryTable from "./Table";
import { useMemo } from "react";

const OrderHistory = () => {
  const { data: fulfilledOrders, isLoading: isFulfillLoading } =
    useUserOrderFulfilledEvents();
  const { data: canceledOrders, isLoading: isCancelLoading } =
    useUserOrderCancelledEvents();

  const orders = useMemo(() => {
    return [...(fulfilledOrders || []), ...(canceledOrders || [])].sort(
      (a, b) => b.timestamp - a.timestamp
    );
  }, [fulfilledOrders, canceledOrders]);

  return (
    <OrderHistoryTable
      isLoading={isFulfillLoading || isCancelLoading}
      orders={orders}
    />
  );
};

export default OrderHistory;
