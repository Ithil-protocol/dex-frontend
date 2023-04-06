import { TableCell, TableHead, TableRow } from "@mui/material";

export function TradesTableHead() {
  return (
    <TableHead style={{ borderBottom: "2px solid transparent" }}>
      <TableRow>
        {["value", "volume", "time"].map((item, i) => (
          <TableCell
            key={i}
            sx={(theme) => ({
              color: theme.palette.text.primary,
            })}
            align="left"
          >
            {item}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
