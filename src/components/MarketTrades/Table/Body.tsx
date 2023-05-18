import { TableBody } from "@mui/material";
import EachTrade from "@/components/MarketTrades/EachTrade";
import TableLoader from "@/components/Common/TableLoader";
import { useAllOrderFulfilledEvents } from "@/hooks/events";

interface Props {
  headsLength: number;
}

const Body: React.FC<Props> = ({ headsLength }) => {
  const { data: trades, isLoading } = useAllOrderFulfilledEvents();

  return (
    <TableBody>
      {isLoading ? (
        <TableLoader cellsNumber={headsLength} rowsNum={10} />
      ) : (
        (trades || []).map((item, i) => <EachTrade key={i} data={item} />)
      )}
    </TableBody>
  );
};

export default Body;
