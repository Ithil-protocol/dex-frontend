import { Table as MuiTable, TableContainer } from "@mui/material";
import Head from "./Head";
import Body from "./Body";
import { HistoryEvent } from "@/types";
import { usePoolStore } from "@/store";

interface Props {
  isLoading: boolean;
  orders: HistoryEvent[];
}

const Table: React.FC<Props> = ({ orders, isLoading }) => {
  const pair = usePoolStore((state) => state.pair);

  const heads = [
    "time",
    "market",
    "side",
    "status",
    `amount (${pair.underlyingLabel})`,
    `price (${pair.accountingLabel})`,
    `total (${pair.accountingLabel})`,
    "boost (ETH)",
  ];

  return (
    <TableContainer
      sx={{
        maxHeight: "300px",
      }}
    >
      <MuiTable size="small">
        <Head heads={heads} />
        <Body
          isLoading={isLoading}
          headsLength={heads.length}
          orders={orders}
        />
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
