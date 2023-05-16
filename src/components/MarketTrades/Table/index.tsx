import Paper from "@mui/material/Paper";
import MuiTable from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Body from "./Body";
import Head from "./Head";
import { usePoolStore } from "@/store";

const Table = () => {
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
      <MuiTable size="small">
        <Head heads={heads} />
        <Body headsLength={heads.length} />
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
