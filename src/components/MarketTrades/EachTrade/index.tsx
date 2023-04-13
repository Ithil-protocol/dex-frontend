import { TableCell, TableRow, useTheme } from "@mui/material";
import BoldSpan from "components/Common/BoldSpan";
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
        <BoldSpan
          style={{
            color:
              data.type === "taker"
                ? theme.palette.success.main
                : theme.palette.error.main,
            fontSize: 14,
          }}
        >
          {truncateString(data.price, 6)}
        </BoldSpan>
      </TableCell>

      <TableCell>
        <BoldSpan
          style={{
            fontSize: 14,
          }}
        >
          {truncateString(data.amount, 6)}
        </BoldSpan>
      </TableCell>

      <TableCell>
        <BoldSpan
          style={{
            fontSize: 12,
          }}
        >
          {data.fullDate}
        </BoldSpan>
      </TableCell>
    </TableRow>
  );
};

export default EachTrade;
