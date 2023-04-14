import { Button, Link, TableCell, TableRow, useTheme } from "@mui/material";
import { Event, utils } from "ethers";
import { useCancelOrder } from "hooks/poolWrite";
import { formatDateToFullDate } from "utility";
import { usePoolStore } from "store";
import { useGetBlock, useGetOrderStatus } from "hooks/account";

interface Props {
  data: Event;
}

const Order: React.FC<Props> = ({ data }) => {
  const args = data.args!;

  const theme = useTheme();
  const defaultPool = usePoolStore((state) => state.default);
  const block = useGetBlock(data);
  const status = useGetOrderStatus(
    data.address as `0x${string}`,
    args.price,
    args.index
  );
  const { cancel } = useCancelOrder({
    index: args.index,
    price: args.price,
  });

  const fullDate = formatDateToFullDate(block.timestamp * 1000);

  const convertedUnderlyingAmount = utils.formatUnits(
    args.underlyingAmount,
    defaultPool.underlying.decimals
  );
  const convertedPrice = utils.formatUnits(
    args.price,
    defaultPool.accounting.decimals
  );

  const convertedStaked = utils.formatUnits(
    args.staked,
    defaultPool.underlying.decimals
  );

  const total = +convertedPrice * +convertedUnderlyingAmount;

  return (
    <TableRow>
      <TableCell>{fullDate}</TableCell>

      <TableCell style={{ fontWeight: 600 }}>
        {`${defaultPool.underlying.label} / ${defaultPool.accounting.label}`}
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

      <TableCell>{`${convertedUnderlyingAmount} ${defaultPool.underlying.label}`}</TableCell>

      <TableCell>{`${convertedPrice} ${defaultPool.accounting.label}`}</TableCell>

      <TableCell>{`${(+total).toFixed(10)} ${
        defaultPool.underlying.label
      }`}</TableCell>

      <TableCell>{`${convertedStaked} ETH`}</TableCell>

      {status === "open" && (
        <TableCell>
          <Button
            size="small"
            color="error"
            sx={{
              padding: "0px",
            }}
            onClick={() => cancel?.()}
            disabled={!cancel}
          >
            cancel
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
};

export default Order;
