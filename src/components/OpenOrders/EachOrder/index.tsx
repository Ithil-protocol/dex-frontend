/* eslint-disable react/jsx-key */
import { Button, TableCell, TableRow } from "@mui/material";
import theme from "styles/theme";
import { OpenOrder } from "types";

interface Props {
  data: OpenOrder;
  hasCancel: boolean;
}

const Order = ({ data, hasCancel }: Props) => {
  return (
    <TableRow>
      {makeRows(data, hasCancel).map((item, i) => (
        <TableCell key={i}>{item}</TableCell>
      ))}
    </TableRow>
  );
};

const makeRows = (data: Props["data"], hasCancel: Props["hasCancel"]) => [
  `${data.time} ${data.date}`,

  <span style={{ fontWeight: 600 }}>
    {`${data.market.split("/")[0]} / ${data.market.split("/")[1]}`}
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

  data.type,

  `${data.amount} ${data.market.split("/")[1]}`,

  data.price,

  `${data.total} ${data.market.split("/")[0]}`,

  `${data.staked} ${data.market.split("/")[0]}`,

  hasCancel && (
    <Button
      size="small"
      sx={{
        padding: "0px",
      }}
    >
      cancel
    </Button>
  ),
];

export default Order;
