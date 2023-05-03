import { useUserOrderCreatedEvents } from "@/hooks/events";
import OpenOrdersTable from "./Table";

const OpenOrders = () => {
  const { data, isLoading } = useUserOrderCreatedEvents();

  return <OpenOrdersTable orders={data || []} isLoading={isLoading} />;
};

export default OpenOrders;
