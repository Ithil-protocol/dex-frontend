import { Button, TableCell, TableRow } from "@mui/material";
import { useCancelOrder } from "hooks/poolWrite";
import { formatDateToFullDate } from "utility";
import { usePoolStore } from "store";
import { OpenOrderEvent } from "types";
import Link from "next/link";
import PreciseNumber from "components/Common/PreciseNumber";

interface Props {
  data: OpenOrderEvent;
}

const Order: React.FC<Props> = ({ data }) => {
  const [pair, pool] = usePoolStore((state) => [
    state.pair,
    data.side === "buy" ? state.buyPool : state.sellPool,
  ]);

  const { cancel } = useCancelOrder({
    index: data.index,
    pool,
    price: data.rawPrice,
    hash: data.transactionHash,
  });

  const total = data.price * data.amount;

  return (
    <TableRow>
      <TableCell>{formatDateToFullDate(data.timestamp)}</TableCell>

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
          {data.status}
        </Link>
      </TableCell>

      <TableCell>
        <span>
          <PreciseNumber num={data.amount} isPrice={false} />
        </span>
      </TableCell>

      <TableCell>
        <span>
          <PreciseNumber num={data.price} isPrice={true} />
        </span>
      </TableCell>

      <TableCell>
        <span>
          <PreciseNumber num={total} isPrice={true} />
        </span>
      </TableCell>

      <TableCell>
        <span>{data.staked}</span>
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
