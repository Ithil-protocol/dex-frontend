import { TableBody } from "@mui/material";
import EachOrder from "../EachOrder";
import { OpenOrderEvent } from "types";

interface Props {
  orders: OpenOrderEvent[];
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
