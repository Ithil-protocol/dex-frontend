import {
  useUserOrderCancelledEvents,
  useUserOrderFulfilledEvents,
} from "@/hooks/events";

import Table from "./Table";
import { useMemo } from "react";

const History = () => {
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
    <Table isLoading={isFulfillLoading || isCancelLoading} orders={orders} />
  );
};

export default History;
