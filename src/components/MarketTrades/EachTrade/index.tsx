import { TableCell, TableRow } from "@mui/material";
import LightTooltip from "components/Common/LightTooltip";
import { useGetBlock } from "hooks/contract";
import { MarketEvent } from "types";
import { formatDateToTime } from "utility";

interface Props {
  data: MarketEvent;
}

const EachTrade = ({ data }: Props) => {
  const block = useGetBlock(data);

  const fullDate = formatDateToTime(block.timestamp * 1000);

  return (
    <TableRow>
      <TableCell
        style={{
          fontSize: 14,
          fontWeight: 900,
        }}
      >
        <LightTooltip placement="top" title={data.amount}>
          <span>{data.amount}</span>
        </LightTooltip>
      </TableCell>
      <TableCell
        sx={(theme) => ({
          fontWeight: 900,
          color:
            data.side === "buy"
              ? theme.palette.success.main
              : theme.palette.error.main,
          fontSize: 14,
        })}
      >
        <LightTooltip placement="top" title={data.price}>
          <span>{data.price}</span>
        </LightTooltip>
      </TableCell>

      <TableCell
        style={{
          fontSize: 12,
          fontWeight: 900,
        }}
      >
        {fullDate}
      </TableCell>
    </TableRow>
  );
};

export default EachTrade;
