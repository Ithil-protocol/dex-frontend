import { TableBody } from "@mui/material";
import { shuffleArray } from "utility";
import EachOrder from "../EachOrder";
import { OpenOrder } from "types";

interface Props {
  openOrdersData: OpenOrder[];
  hasCancel: boolean;
}

const OrdersTableBody: React.FC<Props> = ({ openOrdersData, hasCancel }) => {
  return (
    <TableBody>
      {shuffleArray(openOrdersData).map((item, i) => (
        <EachOrder data={item} key={i} hasCancel={hasCancel} />
      ))}
    </TableBody>
  );
};

export default OrdersTableBody;
