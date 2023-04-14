import { TableCell, TableRow, useTheme } from "@mui/material";
import { Trade } from "types";
import { truncateString } from "utility";

interface Props {
  data: Trade;
}

const EachTrade = ({ data }: Props) => {
  const theme = useTheme();

  return (
    <TableRow>
      <TableCell>
        <span
          style={{
            fontWeight: 900,
            color:
              data.type === "taker"
                ? theme.palette.success.main
                : theme.palette.error.main,
            fontSize: 14,
          }}
        >
          {truncateString(data.price, 9)}
        </span>
      </TableCell>

      <TableCell>
        <span
          style={{
            fontSize: 14,
            fontWeight: 900,
          }}
        >
          {truncateString(data.amount, 9)}
        </span>
      </TableCell>

      <TableCell>
        <span
          style={{
            fontSize: 12,
            fontWeight: 900,
          }}
        >
          {data.fullDate}
        </span>
      </TableCell>
    </TableRow>
  );
};

export default EachTrade;
