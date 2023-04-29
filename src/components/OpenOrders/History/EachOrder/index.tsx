import { Link, TableCell, TableRow } from "@mui/material";
import { formatDateToFullDate, truncateString } from "utility";
import { usePoolStore } from "store";
import { useGetBlock } from "hooks/contract";
import { HistoryEvent } from "types";
import LightTooltip from "components/Common/LightTooltip";

interface Props {
  data: HistoryEvent;
}

const Order: React.FC<Props> = ({ data }) => {
  const pair = usePoolStore((state) => state.pair);
  const block = useGetBlock(data);

  const fullDate = formatDateToFullDate(block.timestamp * 1000);

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
    </TableRow>
  );
};

export default Order;
