/* eslint-disable react/jsx-key */
import { Button, Link, TableCell, TableRow } from "@mui/material";
import { BigNumberish, utils } from "ethers";
import { usePoolOrders } from "hooks/contracts/pool";
import theme from "styles/theme";
import { OpenOrder, Pool } from "types";

interface Props {
  data: OpenOrder;
  hasCancel: boolean;
  pool: Pool;
}

const Order = ({ data, hasCancel, pool }: Props) => {
  const { data: order } = usePoolOrders({
    address: data.address as `0x${string}`,
    args: [data.rawPrice, data.index],
  });
  let status = "";
  console.log("order34", order);
  if (order) {
    const amount = utils.formatUnits(
      order.underlyingAmount as BigNumberish,
      18
    );
    status = +amount === 0 ? "fulfilled" : "open";
  }

  return (
    <TableRow>
      {makeRows(
        {
          ...data,
          status,
        },
        hasCancel,
        pool
      ).map((item, i) => (
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
  `${data.fullDate}`,

  <span style={{ fontWeight: 600 }}>
    {`${pool.underlying.label} / ${pool.accounting.label}`}
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

  <Link
    target="_blank"
    href={`https://goerli.etherscan.io/tx/${data.transactionHash}`}
  >
    {data.status}
  </Link>,

  `${data.amount} ${pool.underlying.label}`,

  `${data.price} ${pool.accounting.label}`,

  `${(+data.total).toFixed(10)} ${pool.underlying.label}`,

  `${data.staked} ETH`,

  data.status === "open" && (
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
