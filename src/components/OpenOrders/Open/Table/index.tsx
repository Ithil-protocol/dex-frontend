import { Table, TableContainer } from "@mui/material";
import OrdersTableHead from "./Head";
import OrdersTableBody from "./Body";
import { OpenOrderEvent } from "@/types";
import { usePoolStore } from "@/store";

interface Props {
  orders: OpenOrderEvent[];
  isLoading: boolean;
}

const OpenOrdersTable: React.FC<Props> = ({ orders, isLoading }) => {
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
      <Table size="small">
        <OrdersTableHead heads={heads} />
        <OrdersTableBody
          headsLength={heads.length}
          orders={orders}
          isLoading={isLoading}
        />
      </Table>
    </TableContainer>
  );
};

export default OpenOrdersTable;
