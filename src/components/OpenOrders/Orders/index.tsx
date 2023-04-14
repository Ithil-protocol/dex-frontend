import { Table } from "@mui/material";
import OrdersTableHead from "./TableHead";
import OrdersTableBody from "./TableBody";
import { Event } from "ethers";

interface Props {
  orders: Event[] | undefined;
}

const Orders: React.FC<Props> = ({ orders = [] }) => {
  return (
    <Table size="small">
      <OrdersTableHead />
      <OrdersTableBody orders={orders} />
    </Table>
  );
};

export default Orders;
