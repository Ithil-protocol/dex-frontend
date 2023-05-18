import { TableBody } from "@mui/material";
import EachOrder from "@/components/OpenOrders/Open/EachOrder";
import { OpenOrderEvent } from "@/types";
import TableLoader from "@/components/Common/TableLoader";

interface Props {
  orders: OpenOrderEvent[];
  isLoading: boolean;
  headsLength: number;
}

const Body: React.FC<Props> = ({ orders, isLoading, headsLength }) => {
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

export default Body;
