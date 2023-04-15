/* eslint-disable react/jsx-key */
import { Button, Link, TableCell, TableRow } from "@mui/material";
import { BigNumber, BigNumberish, utils } from "ethers";
import { usePoolOrders } from "hooks/contracts/pool";
import { useCancelOrder } from "hooks/poolWrite";
import { usePoolStore } from "store";
import theme from "styles/theme";
import { OpenOrder, Pair, Pool } from "types";

interface Props {
  data: OpenOrder;
  hasCancel: boolean;
  pool: Pool;
}

const Order = ({ data, hasCancel, pool }: Props) => {
  const pair = usePoolStore((state) => state.pair);

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

  const { cancel } = useCancelOrder({
    index: data.index as BigNumber,
    price: data.rawPrice,
  });

  return (
    <TableRow>
      {makeRows(
        {
          ...data,
          status,
        },
        hasCancel,
        pair,
        cancel
      ).map((item, i) => (
        <TableCell key={i}>{item}</TableCell>
      ))}
    </TableRow>
  );
};

const makeRows = (
  data: Props["data"],
  hasCancel: Props["hasCancel"],
  pair: Pair,
  cancel: (() => void) | undefined
) => [
  `${data.fullDate}`,

  <span style={{ fontWeight: 600 }}>
    {`${pair.underlyingLabel} / ${pair.accountingLabel}`}
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

  `${data.amount} ${pair.underlyingLabel}`,

  `${data.price} ${pair.accountingLabel}`,

  `${(+data.total).toFixed(10)} ${pair.underlyingLabel}`,

  `${data.staked} ETH`,

  data.status === "open" && (
    <Button
      size="small"
      color="error"
      sx={{
        padding: "0px",
      }}
      onClick={() => cancel?.()}
      disabled={!cancel}
    >
      cancel
    </Button>
  ),
];

export default Order;
