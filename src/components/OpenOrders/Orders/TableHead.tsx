import { TableCell, TableHead, TableRow } from "@mui/material";

export default function OrdersTableHead() {
  return (
    <TableHead style={{ borderBottom: "2px solid transparent" }}>
      <TableRow>
        {["time", "market", "side", "type", "amount", "unitPrice", "total"].map(
          (item, i) => (
            <TableCell
              key={i}
              sx={(theme) => ({
                color: theme.palette.text.secondary,
              })}
              align="left"
            >
              {item}
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
}
