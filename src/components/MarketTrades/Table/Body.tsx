import { TableBody } from "@mui/material";
import EachTrade from "../EachTrade";
import TableLoader from "components/Common/TableLoader";
import { useAllOrderFulfilledEvents } from "hooks/events";

interface Props {
  headsLength: number;
}

const TradesTableBody: React.FC<Props> = ({ headsLength }) => {
  const { data: trades, isLoading } = useAllOrderFulfilledEvents();
  const MAX_ROWS = 50;

  return (
    <TableBody>
      {isLoading ? (
        <TableLoader cellsNumber={headsLength} rowsNum={10} />
      ) : (
        (trades || [])
          .slice(-MAX_ROWS)
          .reverse()
          .map((item, i) => <EachTrade key={i} data={item} />)
      )}
    </TableBody>
  );
};

export default TradesTableBody;
