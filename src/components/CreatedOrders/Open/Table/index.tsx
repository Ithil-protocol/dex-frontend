import { Table } from "@mui/material";
import OrdersTableHead from "./Head";
import OrdersTableBody from "./Body";
import { OpenOrderEvent } from "types";

interface Props {
  orders: OpenOrderEvent[];
}

const OpenOrdersTable: React.FC<Props> = ({ orders }) => {
  return (
    <Table size="small">
      <OrdersTableHead />
      <OrdersTableBody orders={orders} />
    </Table>
  );
};

export default OpenOrdersTable;
