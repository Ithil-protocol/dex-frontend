import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TradesTableBody from "./TableBody";
import { TradesTableHead } from "./TableHead";
import { MarketEvent } from "types";

interface Props {
  trades?: MarketEvent[];
}

const Trades: React.FC<Props> = ({ trades }) => {
  return (
    <TableContainer
      component={(props) => (
        <Paper
          {...props}
          sx={{
            height: "100%",
            maxHeight: "size-mobile in px",
            overflow: "auto",
          }}
        />
      )}
    >
      <Table size="small">
        <TradesTableHead />
        <TradesTableBody trades={trades} />
      </Table>
    </TableContainer>
  );
};

export default Trades;
