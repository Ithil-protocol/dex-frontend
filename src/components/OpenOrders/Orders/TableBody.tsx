import { TableBody } from "@mui/material";
import EachOrder from "../EachOrder";
import { Event } from "ethers";

interface Props {
  orders?: Event[];
}

const OrdersTableBody: React.FC<Props> = ({ orders = [] }) => {
  return (
    <TableBody>
      {orders.map((item, i) => (
        <EachOrder data={item} key={i} />
      ))}
    </TableBody>
  );
};

export default OrdersTableBody;
