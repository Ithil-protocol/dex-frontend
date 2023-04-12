import { TableCell, TableHead, TableRow } from "@mui/material";

export default function OrdersTableHead() {
  return (
    <TableHead>
      <TableRow>
        {[
          "time",
          "market",
          "side",
          // "type",
          "amount",
          "price",
          "total",
          "staked",
        ].map((item, i) => (
          <TableCell
            key={i}
            sx={(theme) => ({
              color: theme.palette.text.secondary,
            })}
          >
            {item}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
