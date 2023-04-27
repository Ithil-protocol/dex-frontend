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
  return (
    <TableBody>
      {isLoading ? (
        <TableLoader cellsNumber={headsLength} rowsNum={10} />
      ) : (
        trades
          .slice(-15)
          .reverse()
          .map((item, i) => <EachTrade key={i} data={item} />)
      )}
    </TableBody>
  );
};

export default TradesTableBody;
