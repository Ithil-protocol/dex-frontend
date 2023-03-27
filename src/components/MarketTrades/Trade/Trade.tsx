import { TableCell, TableRow } from "@mui/material";
import { Order } from "types";
import { formatDate } from "utility";

interface Props {
  data: Order;
}

const Trade = ({ data }: Props) => {
  return (
    <TableRow
      key={data.id}
      sx={{
        "&:not(:last-child)": { borderBottom: "2px solid #485369" },
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell
        style={{
          color: "#306F76",
          fontSize: 12,
          fontWeight: 900,
        }}
        component="th"
        scope="row"
      >
        {data.value}
      </TableCell>
      <TableCell
        style={{
          color: "#969EB2",
          fontSize: 12,
          fontWeight: 900,
        }}
        align="left"
      >
        {data.volume}
      </TableCell>
      <TableCell
        style={{
          color: "#596479",
          fontSize: 11,
          fontWeight: 900,
        }}
        align="left"
      >
        {formatDate(data.time)}
      </TableCell>
    </TableRow>
  );
};

export default Trade;
