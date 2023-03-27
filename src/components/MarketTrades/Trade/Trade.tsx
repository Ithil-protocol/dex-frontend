import { TableCell, TableRow } from "@mui/material";
import { Order } from "types";

interface Props {
  data: Omit<Order, "time"> & { time: string };
}

const Trade = ({ data }: Props) => {
  return (
    <TableRow
      key={data.id}
      sx={{
        borderBottom: "2px solid #485369",
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
        {data.time}
      </TableCell>
    </TableRow>
  );
};

export default Trade;
