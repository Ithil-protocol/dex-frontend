import { Table, TableContainer } from "@mui/material";
import OrdersTableHead from "./Head";
import OrdersTableBody from "./Body";
import { HistoryEvent } from "@/types";
import { usePoolStore } from "@/store";

interface Props {
  isLoading: boolean;
  orders: HistoryEvent[];
}

const OrderHistoryTable: React.FC<Props> = ({ orders, isLoading }) => {
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
          isLoading={isLoading}
          headsLength={heads.length}
          orders={orders}
        />
      </Table>
    </TableContainer>
  );
};

export default OrderHistoryTable;
