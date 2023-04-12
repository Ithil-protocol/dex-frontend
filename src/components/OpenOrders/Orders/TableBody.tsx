import { TableBody } from "@mui/material";
import { shuffleArray } from "utility";
import EachOrder from "../EachOrder";
import { OpenOrder, Pool } from "types";

interface Props {
  openOrdersData: OpenOrder[];
  hasCancel: boolean;
  pool: Pool;
}

const OrdersTableBody: React.FC<Props> = ({
  openOrdersData,
  hasCancel,
  pool,
}) => {
  return (
    <TableBody>
      {shuffleArray(openOrdersData).map((item, i) => (
        <EachOrder pool={pool} data={item} key={i} hasCancel={hasCancel} />
      ))}
    </TableBody>
  );
};

export default OrdersTableBody;
