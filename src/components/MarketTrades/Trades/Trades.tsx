import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TradesTableBody from "./TableBody";
import { TradesTableHead } from "./TableHead";

export default function Trades() {
  return (
    <TableContainer
      component={(props) => (
        <Paper
          {...props}
          sx={(theme) => ({
            backgroundColor: theme.palette.background.paper,
            overflow: "auto",
            height: "100%",
            maxHeight: "size-mobile in px",
          })}
        />
      )}
    >
      <Table size="small">
        <TradesTableHead />
        <TradesTableBody />
      </Table>
    </TableContainer>
  );
}
