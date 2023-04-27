import { TableBody } from "@mui/material";
import EachTrade from "../EachTrade";
import { MarketEvent } from "types";

interface Props {
  trades?: MarketEvent[];
}

const TradesTableBody: React.FC<Props> = ({ trades = [] }) => {
  return (
    <TableBody>
      {trades
        .slice(-15)
        .reverse()
        .map((item, i) => (
          <EachTrade key={i} data={item} />
        ))}
    </TableBody>
  );
};

export default TradesTableBody;
