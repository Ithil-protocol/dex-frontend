import { TableCell, TableRow } from "@mui/material";
import PreciseNumber from "components/Common/PreciseNumber";
import { MarketEvent } from "types";
import { formatDateToTime } from "utility";

interface Props {
  data: MarketEvent;
}

const EachTrade = ({ data }: Props) => {
  const fullDate = formatDateToTime(data.timestamp);

  return (
    <TableRow>
      <TableCell
        style={{
          fontSize: 14,
          fontWeight: 900,
        }}
      >
        <span>
          <PreciseNumber num={data.amount} isPrice={false} />
        </span>
      </TableCell>
      <TableCell
        sx={(theme) => ({
          fontWeight: 900,
          color:
            data.side === "buy"
              ? theme.palette.success.main
              : theme.palette.error.main,
          fontSize: 14,
        })}
      >
        <span>
          <PreciseNumber num={data.price} isPrice={true} />
        </span>
      </TableCell>

      <TableCell
        style={{
          fontSize: 12,
          fontWeight: 900,
        }}
      >
        {fullDate}
      </TableCell>
    </TableRow>
  );
};

export default EachTrade;
