import { TableBody } from "@mui/material";
import EachOrder from "../EachOrder";
import { HistoryEvent } from "types";

interface Props {
  orders: HistoryEvent[];
}

const OrdersTableBody: React.FC<Props> = ({ orders }) => {
  return (
    <TableBody>
      {orders.map((item, i) => (
        <EachOrder data={item} key={i} />
      ))}
    </TableBody>
  );
};

export default OrdersTableBody;
