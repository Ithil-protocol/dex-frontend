import { Chip, TableCell, TableRow } from "@mui/material";
import { formatDateToFullDate } from "@/utility";
import { usePoolStore } from "@/store";
import { HistoryEvent } from "@/types";
import PreciseNumber from "@/components/Common/PreciseNumber";
import { fixPrecision } from "@/utility/converters";
import { etherscanBaseUrl } from "@/config/blockExplorer";

interface Props {
  data: HistoryEvent;
}

const Order: React.FC<Props> = ({ data }) => {
  const pair = usePoolStore((state) => state.pair);

  const {
    accounting: { displayPrecision },
  } = usePoolStore((state) => state.default);

  const total = fixPrecision(data.price * data.amount, displayPrecision);

  return (
    <TableRow
      sx={(theme) => ({
        transition: "background-color 200ms",
        ":hover": {
          backgroundColor: theme.palette.primary.dark,
        },
      })}
    >
      <TableCell sx={{ padding: "8px" }}>
        {formatDateToFullDate(data.timestamp)}
      </TableCell>

      <TableCell style={{ fontWeight: 600 }}>
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
          sx={{ width: 80, color: "white" }}
          size="small"
          variant="filled"
          color={data.status === "fulfilled" ? "success" : "error"}
          component={"a"}
          label={data.status}
          onClick={() =>
            window.open(etherscanBaseUrl + data.transactionHash, "_blank")
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
    </TableRow>
  );
};

export default Order;
