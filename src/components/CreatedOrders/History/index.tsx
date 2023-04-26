import {
  useUserOrderCancelledEvents,
  useUserOrderFulfilledEvents,
} from "hooks/events";

import OrderHistoryTable from "./Table";
import { usePoolStore } from "store";

const OrderHistory = () => {
  const pool = usePoolStore((state) => state.pool);
  const { data: fulfilledOrders } = useUserOrderFulfilledEvents(pool);
  const { data: canceledOrders } = useUserOrderCancelledEvents(pool);

  return (
    <OrderHistoryTable
      orders={[...(fulfilledOrders || []), ...(canceledOrders || [])]}
    />
  );
};

export default OrderHistory;
