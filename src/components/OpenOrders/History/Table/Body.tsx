import { TableBody } from "@mui/material";
import EachOrder from "@/components/OpenOrders/History/EachOrder";
import { HistoryEvent } from "@/types";
import TableLoader from "@/components/Common/TableLoader";

interface Props {
  headsLength: number;
  isLoading: boolean;
  orders: HistoryEvent[];
}

const Body: React.FC<Props> = ({ orders, headsLength, isLoading }) => {
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
