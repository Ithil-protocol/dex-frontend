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
          sx={(theme) => ({ bgcolor: theme.palette.background.paper })}
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
