/* eslint-disable react/jsx-key */
import { Button, Link, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import theme from "styles/theme";
import { OpenOrder, Pool } from "types";
import { formatDateToFullDate } from "utility";
import { useProvider } from "wagmi";

interface Props {
  data: OpenOrder;
  hasCancel: boolean;
  pool: Pool;
}

const Order = ({ data, hasCancel, pool }: Props) => {
  const provider = useProvider();
  const [timeStamp, setTimeStamp] = useState(0);
  provider.getBlock(data.blockNumber).then((e) => setTimeStamp(e.timestamp));

  const fullDate = formatDateToFullDate(timeStamp * 1000);

  return (
    <TableRow>
      {makeRows(data, hasCancel, pool, fullDate).map((item, i) => (
        <TableCell key={i}>{item}</TableCell>
      ))}
    </TableRow>
  );
};

const makeRows = (
  data: Props["data"],
  hasCancel: Props["hasCancel"],
  pool: Pool,
  fullDate: string
) => [
  `${fullDate}`,

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

  <Link target="_blank" href={`https://etherscan.io/address/${data.address}`}>
    {data.status}
  </Link>,

  `${data.amount} ${pool.underlyingLabel}`,

  `${data.price} ${pool.accountingLabel}`,

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
