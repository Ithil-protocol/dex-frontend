import { TableCell, TableRow } from "@mui/material";
import { Order } from "types";
import { formatDate } from "utility";

interface Props {
  data: Order;
}

const EachTrade = ({ data }: Props) => {
  return (
    <TableRow
      key={data.id}
      sx={(theme) => ({
        "&:not(:last-child)": {
          borderBottom: `2px solid ${theme.palette.background.default}`,
        },
        "&:last-child td, &:last-child th": { border: 0 },
      })}
    >
      <TableCell
        sx={(theme) => ({
          color:
            data.type === "taker"
              ? theme.palette.secondary.main
              : theme.palette.error.main,
          fontSize: 12,
          fontWeight: 900,
        })}
        component="th"
        scope="row"
      >
        {data.value}
      </TableCell>

      <TableCell
        sx={(theme) => ({
          color: theme.palette.text.primary,
          fontSize: 12,
          fontWeight: 900,
        })}
        align="left"
      >
        {data.volume}
      </TableCell>

      <TableCell
        sx={(theme) => ({
          color: theme.palette.text.primary,
          fontSize: 11,
          fontWeight: 900,
        })}
        align="left"
      >
        {formatDate(data.time)}
      </TableCell>
    </TableRow>
  );
};

export default EachTrade;