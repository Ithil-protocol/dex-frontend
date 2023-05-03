import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TradesTableBody from "./Body";
import TradesTableHead from "./Head";
import { usePoolStore } from "@/store";

interface Props {}

const MarketTradesTable: React.FC<Props> = () => {
  const pair = usePoolStore((state) => state.pair);

  const heads = [
    `amount (${pair.underlyingLabel})`,
    `price (${pair.accountingLabel})`,
    "time",
  ];

  return (
    <TableContainer
      sx={{ maxHeight: "400px" }}
      component={(props) => (
        <Paper
          elevation={0}
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
        <TradesTableBody headsLength={heads.length} />
      </Table>
    </TableContainer>
  );
};

export default MarketTradesTable;
