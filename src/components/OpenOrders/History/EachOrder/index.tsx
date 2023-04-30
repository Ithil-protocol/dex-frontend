import { Link, TableCell, TableRow } from "@mui/material";
import { formatDateToFullDate } from "utility";
import { usePoolStore } from "store";
import { HistoryEvent } from "types";
import LightTooltip from "components/Common/LightTooltip";
import PreciseNumber from "components/Common/PreciseNumber";

interface Props {
  data: HistoryEvent;
}

const Order: React.FC<Props> = ({ data }) => {
  const pair = usePoolStore((state) => state.pair);

  const total = data.price * data.amount;

  return (
    <TableRow>
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
    </TableRow>
  );
};

export default Order;
