import { TableCell, TableRow, useTheme } from "@mui/material";
import { Event, utils } from "ethers";
import { useGetBlock } from "hooks/contract";
import { usePoolStore } from "store";
import { formatDateToTime, truncateString } from "utility";

interface Props {
  data: Event;
}

const EachTrade = ({ data }: Props) => {
  const theme = useTheme();
  const defaultPool = usePoolStore((state) => state.default);
  const block = useGetBlock(data);

  const args = data.args!;

  const fullDate = formatDateToTime(block.timestamp * 1000);
  const convertedAmount = utils.formatUnits(
    args.amount,
    defaultPool.underlying.decimals
  );
  const convertedPrice = utils.formatUnits(
    args.price,
    defaultPool.accounting.decimals
  );

  return (
    <TableRow>
      <TableCell
        style={{
          fontWeight: 900,
          color:
            // data.type === "taker"
            // ?
            theme.palette.success.main,
          // : theme.palette.error.main,
          fontSize: 14,
        }}
      >
        {truncateString(convertedPrice, 9)}
      </TableCell>

      <TableCell
        style={{
          fontSize: 14,
          fontWeight: 900,
        }}
      >
        {truncateString(convertedAmount, 18)}
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
