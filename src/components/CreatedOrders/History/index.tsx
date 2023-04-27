import {
  useUserOrderCancelledEvents,
  useUserOrderFulfilledEvents,
} from "hooks/events";

import OrderHistoryTable from "./Table";

const OrderHistory = () => {
  const { data: fulfilledOrders, isLoading: isFulfillLoading } =
    useUserOrderFulfilledEvents();
  const { data: canceledOrders, isLoading: isCancelLoading } =
    useUserOrderCancelledEvents();

  return (
    <OrderHistoryTable
      isLoading={isFulfillLoading || isCancelLoading}
      orders={[...(fulfilledOrders || []), ...(canceledOrders || [])]}
    />
  );
};

export default OrderHistory;
