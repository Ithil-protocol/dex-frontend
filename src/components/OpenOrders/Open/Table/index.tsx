import { Table as MuiTable, TableContainer } from "@mui/material";
import Head from "./Head";
import Body from "./Body";
import { OpenOrderEvent } from "@/types";
import { usePoolStore } from "@/store";

interface Props {
  orders: OpenOrderEvent[];
  isLoading: boolean;
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
    "staked (ETH)",
    "actions",
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
          headsLength={heads.length}
          orders={orders}
          isLoading={isLoading}
        />
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
