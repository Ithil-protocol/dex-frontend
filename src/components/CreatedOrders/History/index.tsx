import {
  useUserOrderCancelledEvents,
  useUserOrderFulfilledEvents,
} from "hooks/events";

import OrderHistoryTable from "./Table";
import { usePoolStore } from "store";

const OrderHistory = () => {
  const pool = usePoolStore((state) => state.pool);
  const { data: fulfilledOrders, isLoading: isFulfillLoading } =
    useUserOrderFulfilledEvents(pool);
  const { data: canceledOrders, isLoading: isCancelLoading } =
    useUserOrderCancelledEvents(pool);

  return (
    <OrderHistoryTable
      isLoading={isFulfillLoading || isCancelLoading}
      orders={[...(fulfilledOrders || []), ...(canceledOrders || [])]}
    />
  );
};

export default OrderHistory;
