import { TableCell, TableHead, TableRow } from "@mui/material";

export function TradesTableHead() {
  return (
    <TableHead>
      <TableRow>
        {["value", "volume", "time"].map((item, i) => (
          <TableCell key={i}>{item}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
