import { Link, TableCell, TableRow, useTheme } from "@mui/material";
import { Event, utils } from "ethers";
import { formatDateToFullDate } from "utility";
import { usePoolStore } from "store";
import { useGetBlock } from "hooks/contract";
import { buyAmountConverter } from "utility/convertors";
import { buyPriceConverter } from "utility/convertors";

interface Props {
  data: Event;
}

type Status = "canceled" | "fulfilled" | "";

const Order: React.FC<Props> = ({ data }) => {
  const theme = useTheme();
  const [pool, pair] = usePoolStore((state) => [state.pool, state.pair]);
  const block = useGetBlock(data);

  const convertedUnderlyingAmount = buyAmountConverter(
    data.args!.underlyingToTransfer || data.args!.amount || "0x00",
    data.args!.underlyingToTransfer || data.args!.price || "0x00",
    pool
  );

  const status: Status =
    +convertedUnderlyingAmount === 0 ? "fulfilled" : "canceled";

  const fullDate = formatDateToFullDate(block.timestamp * 1000);

  const convertedPrice = buyPriceConverter(data.args!.price || "0x00", pool);

  const convertedStaked = utils.formatUnits(
    data.args!.staked || "0x00",
    pool.underlying.decimals
  );

  const total = +convertedPrice * +convertedUnderlyingAmount;

  return (
    <TableRow>
      <TableCell>{fullDate}</TableCell>

      <TableCell style={{ fontWeight: 600 }}>
        {`${pair.underlyingLabel} / ${pair.accountingLabel}`}
      </TableCell>

      <TableCell
        style={{
          fontWeight: 400,
          color:
            // data.side === "buy"
            // ?
            theme.palette.success.main,
          // : theme.palette.error.main,
        }}
      >
        {
          // data.side
          "buy"
        }
      </TableCell>

      <TableCell>
        <Link
          target="_blank"
          href={`https://goerli.etherscan.io/tx/${data.transactionHash}`}
        >
          {status}
        </Link>
      </TableCell>

      <TableCell>{`${convertedUnderlyingAmount} ${pair.underlyingLabel}`}</TableCell>

      <TableCell>{`${convertedPrice} ${pair.accountingLabel}`}</TableCell>

      <TableCell>{`${(+total).toFixed(10)} ${pair.underlyingLabel}`}</TableCell>

      <TableCell>{`${convertedStaked} ETH`}</TableCell>
    </TableRow>
  );
};

export default Order;
