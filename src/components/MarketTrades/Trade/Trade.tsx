import { TableCell, TableRow } from "@mui/material";
import { Order } from "types";

const Trade = ({ item }: { item: Order }) => {
  return (
    <TableRow
      key={item.id}
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
        {item.value}
      </TableCell>
      <TableCell
        style={{
          color: "#969EB2",
          fontSize: 12,
          fontWeight: 900,
        }}
        align="left"
      >
        {item.volume}
      </TableCell>
      <TableCell
        style={{
          color: "#596479",
          fontSize: 11,
          fontWeight: 900,
        }}
        align="left"
      >
        {item.time}
      </TableCell>
    </TableRow>
  );
};

export default Trade;
