import { Box, Dialog, DialogTitle, Skeleton, Button } from "@mui/material";
import { BigNumber } from "ethers";
import { usePoolPreviewOrder } from "hooks/contracts/pool";
import { Dispatch, SetStateAction } from "react";
import { usePoolStore } from "store";
import { LimitFinalValues } from "types";
import styles from "./LimitConfirmation.module.scss";
import { useGetConvertersBySide } from "hooks/converters";
import { capitalizeFirstLetter } from "utility";
interface Props {
  finalValues: LimitFinalValues;
  write: (() => void) | undefined;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const LimitConfirmation: React.FC<Props> = ({
  finalValues,
  open,
  setOpen,
  write,
}) => {
  const [side, pool, pair] = usePoolStore((state) => [
    state.side,
    state.pool,
    state.pair,
  ]);

  const converters = useGetConvertersBySide(side);
  const { data: preview, isLoading } = usePoolPreviewOrder({
    address: pool.address,
    args: [finalValues.price, finalValues.boost],
  });

  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={closeHandler} fullWidth maxWidth={"xs"}>
      <DialogTitle align="center">Limit order confirmation</DialogTitle>
      <Box display={"flex"} flexDirection={"column"} px={6} py={3} gap={1}>
        <div className={styles.row}>
          <span>Actual Price</span>
          {isLoading ? (
            <Skeleton height={20} />
          ) : (
            <span>
              {converters.priceConverter(preview!.actualPrice)}{" "}
              {pair.accountingLabel}
            </span>
          )}
        </div>
        <div className={styles.row}>
          <span>Amount</span>
          {isLoading ? (
            <Skeleton height={20} />
          ) : (
            <span>
              {converters.amountConverter(
                finalValues.amount,
                preview!.actualPrice
              )}{" "}
              {pair.underlyingLabel}
            </span>
          )}
        </div>
        <div className={styles.row}>
          <span>Position</span>
          {isLoading ? (
            <Skeleton height={20} />
          ) : (
            <span>{preview!.position.toNumber()}</span>
          )}
        </div>
        <div className={styles.row}>
          <span>Volume before you</span>
          {isLoading ? (
            <Skeleton height={20} />
          ) : (
            <span>
              {converters.amountConverter(
                preview!.cumulativeUndAmount,
                preview!.actualPrice
              )}{" "}
              {pair.underlyingLabel}
            </span>
          )}
        </div>
        <div className={styles.buttons}>
          <Button
            onClick={closeHandler}
            fullWidth
            variant="outlined"
            color="info"
          >
            Close
          </Button>
          <Button
            onClick={() => write?.()}
            fullWidth
            variant="contained"
            color={side === "buy" ? "success" : "error"}
          >
            {capitalizeFirstLetter(side)}
          </Button>
        </div>
      </Box>
    </Dialog>
  );
};

export default LimitConfirmation;
