import { Paper, Table, TableContainer } from "@mui/material";
import { OpenOrder } from "types";
import OrdersTableHead from "./TableHead";
import OrdersTableBody from "./TableBody";

interface Props {
  openOrdersData: OpenOrder[];
  hasCancel: boolean;
}

const Orders: React.FC<Props> = ({ openOrdersData, hasCancel }) => {
  return (
    <TableContainer
      component={(props) => (
        <Paper
          {...props}
          sx={(theme) => ({ bgcolor: theme.palette.background.paper })}
        />
      )}
    >
      <Table size="small">
        <OrdersTableHead />
        <OrdersTableBody
          hasCancel={hasCancel}
          openOrdersData={openOrdersData}
        />
      </Table>
    </TableContainer>
  );
};

export default Orders;
