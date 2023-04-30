import { Link, TableCell, TableRow } from "@mui/material";
import { formatDateToFullDate } from "utility";
import { usePoolStore } from "store";
import { HistoryEvent } from "types";
import LightTooltip from "components/Common/LightTooltip";

interface Props {
  data: HistoryEvent;
}

const Order: React.FC<Props> = ({ data }) => {
  const pair = usePoolStore((state) => state.pair);

  const fullDate = formatDateToFullDate(data.timestamp);

  const total = +data.price * +data.amount;

  return (
    <TableRow>
      <TableCell sx={{ padding: "8px" }}>{fullDate}</TableCell>

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
    </TableRow>
  );
};

export default Order;
