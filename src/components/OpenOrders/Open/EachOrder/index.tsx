import { Button, TableCell, TableRow } from "@mui/material";
import { useCancelOrder } from "hooks/poolWrite";
import { formatDateToFullDate, truncateString } from "utility";
import { usePoolStore } from "store";
import { useGetBlock, useGetOrderStatus } from "hooks/contract";
import { OpenOrderEvent } from "types";
import LightTooltip from "components/Common/LightTooltip";
import Link from "next/link";

interface Props {
  data: OpenOrderEvent;
}

const Order: React.FC<Props> = ({ data }) => {
  const pair = usePoolStore((state) => state.pair);
  const block = useGetBlock(data);
  const status = useGetOrderStatus(
    data.address as `0x${string}`,
    data.rawPrice,
    data.index
  );

  const { cancel } = useCancelOrder({
    index: data.index,
    price: data.rawPrice,
    pool: data.pool,
  });

  if (status === "fulfilled") return null;

  const fullDate = formatDateToFullDate(block.timestamp * 1000);

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
          <span>{truncateString(data.amount, 9)}</span>
        </LightTooltip>
      </TableCell>

      <TableCell>
        <LightTooltip placement="top" title={data.price}>
          <span>{truncateString(data.price, 9)}</span>
        </LightTooltip>
      </TableCell>

      <TableCell>
        <LightTooltip placement="top" title={total}>
          <span>{truncateString(total.toString(), 9)}</span>
        </LightTooltip>
      </TableCell>

      <TableCell>
        <LightTooltip placement="top" title={data.staked}>
          <span>{truncateString(data.staked, 9)}</span>
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
