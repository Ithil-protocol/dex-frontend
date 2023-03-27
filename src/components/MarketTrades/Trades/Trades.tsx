import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Trade from "components/MarketTrades/Trade/Trade";
import * as React from "react";
import { buyOrders } from "store/web3Store";
import { formatDate } from "utility";

export default function Trades() {
  return (
    <TableContainer
      component={(props) => (
        <Paper {...props} style={{ backgroundColor: "#233347" }} />
      )}
    >
      <Table sx={{}} size="small" aria-label="a dense table">
        <TradeTableHead />
        <TradesTableBody />
      </Table>
    </TableContainer>
  );
}

const TradeTableHead = () => {
  return (
    <TableHead>
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
  const orders = React.useMemo(
    () =>
      buyOrders
        .sort((a, b) => b.time - a.time)
        .slice(10)
        .map((item) => ({ ...item, time: formatDate(item.time) })),
    []
  );

  return (
    <TableBody>
      {orders.map((item, i) => (
        <Trade key={i} data={item} />
      ))}
    </TableBody>
  );
};
