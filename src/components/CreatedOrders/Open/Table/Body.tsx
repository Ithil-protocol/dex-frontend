import { TableBody } from "@mui/material";
import EachOrder from "../EachOrder";
import { Event } from "ethers";

interface Props {
  canceledOrders: Event[];
  createdOrders: Event[];
}

const OrdersTableBody: React.FC<Props> = ({
  canceledOrders,
  createdOrders,
}) => {
  return (
    <TableBody>
      {createdOrders.map((item, i) => (
        <EachOrder data={item} key={i} />
      ))}
    </TableBody>
  );
};

export default OrdersTableBody;
