import { Table } from "@mui/material";
import OrdersTableHead from "./Head";
import OrdersTableBody from "./Body";
import { Event } from "ethers";

interface Props {
  createdOrders: Event[];
  canceledOrders: Event[];
}

const OpenOrdersTable: React.FC<Props> = ({
  canceledOrders,
  createdOrders,
}) => {
  return (
    <Table size="small">
      <OrdersTableHead />
      <OrdersTableBody
        createdOrders={createdOrders}
        canceledOrders={canceledOrders}
      />
    </Table>
  );
};

export default OpenOrdersTable;
