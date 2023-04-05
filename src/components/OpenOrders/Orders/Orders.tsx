import Order from "../Order/Order";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import theme from "styles/theme";
import { shuffleArray } from "utility";
import { OpenOrder } from "types";

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

const OrdersTableHead = () => {
  return (
    <TableHead style={{ borderBottom: "2px solid transparent" }}>
      <TableRow>
        {["time", "market", "side", "type", "amount", "unitPrice", "total"].map(
          (item, i) => (
            <TableCell
              key={i}
              style={{
                color: theme.palette.text.secondary,
              }}
              align="left"
            >
              {item}
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
};

const OrdersTableBody: React.FC<Props> = ({ openOrdersData, hasCancel }) => {
  return (
    <TableBody>
      {shuffleArray(openOrdersData).map((item, i) => (
        <Order data={item} key={i} hasCancel={hasCancel} />
      ))}
    </TableBody>
  );
};

export default Orders;
