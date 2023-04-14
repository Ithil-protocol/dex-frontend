import { TableCell, TableHead, TableRow } from "@mui/material";

export function TradesTableHead() {
  return (
    <TableHead>
      <TableRow>
        {["price", "amount", "time"].map((item, i) => (
          <TableCell key={i}>{item}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
