import { Paper, Table, TableContainer } from "@mui/material";
import { OpenOrder, Pool } from "types";
import OrdersTableHead from "./TableHead";
import OrdersTableBody from "./TableBody";

interface Props {
  openOrdersData: OpenOrder[];
  hasCancel: boolean;
  pool: Pool;
}

const Orders: React.FC<Props> = ({ openOrdersData, hasCancel, pool }) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <OrdersTableHead />
        <OrdersTableBody
          pool={pool}
          hasCancel={hasCancel}
          openOrdersData={openOrdersData}
        />
      </Table>
    </TableContainer>
  );
};

export default Orders;
