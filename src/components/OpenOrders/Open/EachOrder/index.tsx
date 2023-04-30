import { Button, TableCell, TableRow } from "@mui/material";
import { useCancelOrder } from "hooks/poolWrite";
import { formatDateToFullDate } from "utility";
import { usePoolStore } from "store";
import { useGetOrderStatus } from "hooks/contract";
import { OpenOrderEvent } from "types";
import LightTooltip from "components/Common/LightTooltip";
import Link from "next/link";

interface Props {
  data: OpenOrderEvent;
}

const Order: React.FC<Props> = ({ data }) => {
  const [pair, pool] = usePoolStore((state) => [
    state.pair,
    data.side === "buy" ? state.buyPool : state.sellPool,
  ]);

  //CLEANME
  const status = useGetOrderStatus(
    data.address as `0x${string}`,
    data.rawPrice,
    data.index
  );

  const { cancel } = useCancelOrder({
    index: data.index,
    pool,
    price: data.rawPrice,
  });

  if (status === "fulfilled") return null;

  const fullDate = formatDateToFullDate(data.timestamp);

  const total = +data.price * +data.amount;

  return (
    <TableRow>
      <TableCell>{fullDate}</TableCell>

      <TableCell sx={{ padding: "8px", fontWeight: 600 }}>
        {`${pair.underlyingLabel} / ${pair.accountingLabel}`}
      </TableCell>

      <TableCell
        sx={(theme) => ({
          fontWeight: 400,
          color:
            data.side === "buy"
              ? theme.palette.success.main
              : theme.palette.error.main,
        })}
      >
        {data.side}
      </TableCell>

      <TableCell>
        <Link
          target="_blank"
          href={`https://goerli.etherscan.io/tx/${data.transactionHash}`}
        >
          {status}
        </Link>
      </TableCell>

      <TableCell>
        <LightTooltip placement="top" title={data.amount}>
          <span>{data.amount}</span>
        </LightTooltip>
      </TableCell>

      <TableCell>
        <LightTooltip placement="top" title={data.price}>
          <span>{data.price}</span>
        </LightTooltip>
      </TableCell>

      <TableCell>
        <LightTooltip placement="top" title={total}>
          <span>{total}</span>
        </LightTooltip>
      </TableCell>

      <TableCell>
        <LightTooltip placement="top" title={data.staked}>
          <span>{data.staked}</span>
        </LightTooltip>
      </TableCell>

      <TableCell>
        <Button
          variant="contained"
          disableElevation
          size="small"
          color="error"
          sx={(theme) => ({
            padding: "0px",
            ":disabled": {
              color: theme.palette.text.disabled,
            },
          })}
          onClick={() => cancel?.()}
          disabled={!cancel}
        >
          cancel
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Order;
