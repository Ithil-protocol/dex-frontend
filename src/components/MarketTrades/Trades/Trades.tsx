import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Trade from "components/MarketTrades/Trade/Trade";
import { buyOrders } from "store/web3Store";

export default function Trades() {
  return (
    <TableContainer
      component={(props) => (
        <Paper {...props} style={{ backgroundColor: "#233347" }} />
      )}
    >
      <Table size="small" aria-label="a dense table">
        <TradeTableHead />
        <TradesTableBody />
      </Table>
    </TableContainer>
  );
}

const TradeTableHead = () => {
  return (
    <TableHead style={{ borderBottom: "2px solid transparent" }}>
      <TableRow>
        {["value", "volume", "time"].map((item, i) => (
          <TableCell
            key={i}
            style={{
              color: "white",
            }}
            align="left"
          >
            {item}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const TradesTableBody = () => {
  return (
    <TableBody>
      {buyOrders
        .slice(-10)
        .reverse()
        .map((item, i) => (
          <Trade key={i} data={item} />
        ))}
    </TableBody>
  );
};
