import { TableCell, TableHead, TableRow } from "@mui/material";

export default function OrdersTableHead() {
  return (
    <TableHead>
      <TableRow>
        {[
          "time",
          "market",
          "side",
          // "status",
          "amount",
          "price",
          "total",
          "staked",
          "actions",
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
