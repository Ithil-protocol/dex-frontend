import { TableCell, TableRow, useTheme } from "@mui/material";
import BoldSpan from "components/Common/BoldSpan";
import { Order } from "types";
import { formatDate } from "utility";

interface Props {
  data: Order;
}

const EachTrade = ({ data }: Props) => {
  const theme = useTheme();

  return (
    <TableRow key={data.id}>
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
          {data.value}
        </BoldSpan>
      </TableCell>

      <TableCell>
        <BoldSpan
          style={{
            fontSize: 14,
          }}
        >
          {data.volume}
        </BoldSpan>
      </TableCell>

      <TableCell>
        <BoldSpan
          style={{
            fontSize: 12,
          }}
        >
          {formatDate(data.time)}
        </BoldSpan>
      </TableCell>
    </TableRow>
  );
};

export default EachTrade;
