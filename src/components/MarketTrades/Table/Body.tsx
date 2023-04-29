import { TableBody } from "@mui/material";
import EachTrade from "../EachTrade";
import { MarketEvent } from "types";
import TableLoader from "components/Common/TableLoader";

interface Props {
  trades: MarketEvent[];
  isLoading: boolean;
  headsLength: number;
}

const TradesTableBody: React.FC<Props> = ({
  trades,
  isLoading,
  headsLength,
}) => {
  const MAX_ROWS = 10;

  return (
    <TableBody>
      {isLoading ? (
        <TableLoader cellsNumber={headsLength} rowsNum={MAX_ROWS} />
      ) : (
        trades
          .slice(-MAX_ROWS)
          .reverse()
          .map((item, i) => <EachTrade key={i} data={item} />)
      )}
    </TableBody>
  );
};

export default TradesTableBody;
