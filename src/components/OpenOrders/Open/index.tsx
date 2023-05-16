import { useUserOrderCreatedEvents } from "@/hooks/events";
import Table from "./Table";

const Open = () => {
  const { data, isLoading } = useUserOrderCreatedEvents();

  return <Table orders={data || []} isLoading={isLoading} />;
};

export default Open;
