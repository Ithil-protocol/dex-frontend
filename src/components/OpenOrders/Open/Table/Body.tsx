import { TableBody } from "@mui/material";
import EachOrder from "../EachOrder";
import { OpenOrderEvent } from "types";
import TableLoader from "../../../Common/TableLoader";

interface Props {
  orders: OpenOrderEvent[];
  isLoading: boolean;
  headsLength: number;
}

const OrdersTableBody: React.FC<Props> = ({
  orders,
  isLoading,
  headsLength,
}) => {
  return (
    <TableBody>
      {isLoading ? (
        <TableLoader rowsNum={5} cellsNumber={headsLength} />
      ) : (
        orders.map((item, i) => <EachOrder data={item} key={i} />)
      )}
    </TableBody>
  );
};

export default OrdersTableBody;
