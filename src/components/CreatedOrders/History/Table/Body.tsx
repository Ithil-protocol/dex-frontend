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
  console.log("createdOrders::::", createdOrders);

  const canceledOrder = createdOrders.find((i) => {
    canceledOrders.find((j) => {
      return (
        i.address === j.address &&
        i.args!.price === j.args!.price &&
        i.args!.index === j.args!.index
      );
    });
  });

  console.log("canceledOrder::", canceledOrder);

  return (
    <TableBody>
      {createdOrders.map((item, i) => (
        <EachOrder data={item} key={i} />
      ))}
    </TableBody>
  );
};

export default OrdersTableBody;
