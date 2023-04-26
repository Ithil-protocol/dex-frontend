import { Table } from "@mui/material";
import OrdersTableHead from "./Head";
import OrdersTableBody from "./Body";
import { HistoryEvent } from "types";

interface Props {
  orders: HistoryEvent[];
}

const OrderHistoryTable: React.FC<Props> = ({ orders }) => {
  return (
    <Table size="small">
      <OrdersTableHead />
      <OrdersTableBody orders={orders} />
    </Table>
  );
};

export default OrderHistoryTable;
