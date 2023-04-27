import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TradesTableBody from "./Body";
import TradesTableHead from "./Head";
import { MarketEvent } from "types";

interface Props {
  trades: MarketEvent[];
  isLoading: boolean;
}

const Trades: React.FC<Props> = ({ trades, isLoading }) => {
  const heads = ["price", "amount", "time"];

  return (
    <TableContainer
      sx={{ maxHeight: "400px" }}
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
        <TradesTableHead heads={heads} />
        <TradesTableBody
          headsLength={heads.length}
          trades={trades}
          isLoading={!isLoading}
        />
      </Table>
    </TableContainer>
  );
};

export default Trades;
