/* eslint-disable react/jsx-key */
import { Button, TableCell, TableRow } from "@mui/material";
import theme from "styles/theme";
import { OpenOrder, Pool } from "types";

interface Props {
  data: OpenOrder;
  hasCancel: boolean;
  pool: Pool;
}

const Order = ({ data, hasCancel, pool }: Props) => {
  console.log(pool);

  return (
    <TableRow>
      {makeRows(data, hasCancel, pool).map((item, i) => (
        <TableCell key={i}>{item}</TableCell>
      ))}
    </TableRow>
  );
};

const makeRows = (
  data: Props["data"],
  hasCancel: Props["hasCancel"],
  pool: Pool
) => [
  `${data.time} ${data.date}`,

  <span style={{ fontWeight: 600 }}>
    {`${pool.underlyingLabel} / ${pool.accountingLabel}`}
  </span>,

  <span
    style={{
      fontWeight: 400,
      color:
        data.side === "buy"
          ? theme.palette.success.main
          : theme.palette.error.main,
    }}
  >
    {data.side}
  </span>,

  // data.type,

  `${data.amount} ${pool.accountingLabel}`,

  data.price,

  `${data.total} ${pool.underlyingLabel}`,

  `${data.staked} ETH`,

  hasCancel && (
    <Button
      size="small"
      color="error"
      sx={{
        padding: "0px",
      }}
    >
      cancel
    </Button>
  ),
];

export default Order;
