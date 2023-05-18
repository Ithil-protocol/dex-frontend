import { TableCell, TableRow, Chip, CircularProgress } from "@mui/material";
import { useCancelOrder } from "@/hooks/poolWrite";
import { formatDateToFullDate } from "@/utility";
import { usePoolStore } from "@/store";
import { OpenOrderEvent } from "@/types";
import PreciseNumber from "@/components/Common/PreciseNumber";
import { fixPrecision } from "@/utility/converters";
import { LoadingButton } from "@mui/lab";
import { etherscanBaseUrl } from "@/config/blockExplorer";

interface Props {
  data: OpenOrderEvent;
}

const Order: React.FC<Props> = ({ data }) => {
  const [pair, pool] = usePoolStore((state) => [
    state.pair,
    data.side === "buy" ? state.buyPool : state.sellPool,
  ]);

  const { cancel } = useCancelOrder({
    transactionHash: data.transactionHash,
    index: data.index,
    pool,
    price: data.rawPrice,
  });

  const {
    accounting: { displayPrecision },
  } = usePoolStore((state) => state.default);

  const total = fixPrecision(data.price * data.amount, displayPrecision);

  const isCanceling = data.status === "canceling";

  return (
    <TableRow
      sx={(theme) => ({
        transition: "background-color 200ms",
        backgroundColor: isCanceling
          ? theme.palette.background.default
          : theme.palette.background.paper,

        ":hover": {
          backgroundColor: isCanceling
            ? theme.palette.background.default
            : theme.palette.primary.dark,
        },
      })}
    >
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
        <Chip
          sx={{ width: 80 }}
          size="small"
          variant="outlined"
          color={
            data.status === "open"
              ? "default"
              : isCanceling
              ? "error"
              : "warning"
          }
          component={"a"}
          label={data.status}
          onClick={
            data.status === "open"
              ? () =>
                  window.open(etherscanBaseUrl + data.transactionHash, "_blank")
              : undefined
          }
        />
      </TableCell>

      <TableCell>
        <span>
          <PreciseNumber num={data.amount} isPrice={false} />
        </span>
      </TableCell>

      <TableCell>
        <span>
          <PreciseNumber num={data.executed} isPrice={false} />
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
        <LoadingButton
          loading={isCanceling}
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
          onClick={isCanceling ? undefined : () => cancel?.()}
          disabled={!cancel}
        >
          {isCanceling ? (
            <CircularProgress
              sx={{ margin: "5px" }}
              size={14}
              color="inherit"
            />
          ) : (
            "cancel"
          )}
        </LoadingButton>
      </TableCell>
    </TableRow>
  );
};

export default Order;
