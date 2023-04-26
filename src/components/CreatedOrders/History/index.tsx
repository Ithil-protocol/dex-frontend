import {
  useUserOrderCancelledEvents,
  useUserOrderFulfilledEvents,
} from "hooks/events";

import OrderHistoryTable from "./Table";

const OrderHistory = () => {
  const { data: fulfilledOrders } = useUserOrderFulfilledEvents();
  const { data: canceledOrders } = useUserOrderCancelledEvents();

  const reversedCreatedOrders = [...(fulfilledOrders || [])].reverse();
  const fixedCanceledOrders = canceledOrders || [];

  return (
    <OrderHistoryTable
      orders={[...reversedCreatedOrders, ...fixedCanceledOrders]}
    />
  );
};

export default OrderHistory;
