import { useUserOrderCreatedEvents } from "hooks/events";
import OpenOrdersTable from "./Table";
import { usePoolStore } from "store";

const OpenOrders = () => {
  const pool = usePoolStore((state) => state.pool);
  const { data } = useUserOrderCreatedEvents(pool);

  return <OpenOrdersTable orders={data || []} />;
};

export default OpenOrders;
