import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  Skeleton,
} from "@mui/material";
import { usePoolPreviewOrder } from "hooks/contracts/pool";
import { Dispatch, SetStateAction } from "react";
import { usePoolStore } from "store";
import { LimitFinalValues } from "types";
import styles from "./LimitConfirmation.module.scss";
import { useGetConvertersBySide } from "hooks/converters";
import { capitalizeFirstLetter } from "utility";
import { LoadingButton } from "@mui/lab";
import { constants } from "ethers";
interface Props {
  finalValues: LimitFinalValues;
  write: (() => void) | undefined;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}

const LimitConfirmation: React.FC<Props> = ({
  finalValues,
  open,
  setOpen,
  write,
  isLoading,
}) => {
  const [side, pool, pair] = usePoolStore((state) => [
    state.side,
    state.pool,
    state.pair,
  ]);

  const converters = useGetConvertersBySide(side);
  const { data: preview, isLoading: previewLoading } = usePoolPreviewOrder({
    address: pool.address,
    args: [finalValues.price, finalValues.boost],
  });

  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={closeHandler} fullWidth maxWidth={"xs"}>
      <DialogTitle fontWeight={800} align="center">
        Limit order confirmation
      </DialogTitle>
      <Box display={"flex"} flexDirection={"column"} px={6} py={3} gap={1}>
        <div className={styles.row}>
          <span>Actual Price</span>
          {previewLoading ? (
            <Skeleton height={20} />
          ) : (
            <span>
              {converters.priceConverter(preview!.actualPrice)}{" "}
              <LabelChip label={pair.accountingLabel} />
            </span>
          )}
        </div>
        <div className={styles.row}>
          <span>Amount</span>
          {previewLoading ? (
            <Skeleton height={20} />
          ) : (
            <span>
              {converters.amountConverter(
                finalValues.amount,
                preview!.actualPrice
              )}{" "}
              <LabelChip label={pair.underlyingLabel} />
            </span>
          )}
        </div>
        <div className={styles.row}>
          <span>Staked (Boost)</span>
          {previewLoading ? (
            <Skeleton height={20} />
          ) : (
            <span>
              {converters.stakedConverter(finalValues.boost)}{" "}
              <LabelChip label={"ETH"} />
            </span>
          )}
        </div>
        <div className={styles.row}>
          <span>Orders before you</span>
          {previewLoading ? (
            <Skeleton height={20} />
          ) : (
            <span>{preview!.position.toNumber()}</span>
          )}
        </div>
        <div className={styles.row}>
          <span>Volume before you</span>
          {previewLoading ? (
            <Skeleton height={20} />
          ) : (
            <span>
              {converters.amountConverter(
                preview!.cumulativeUndAmount,
                preview!.actualPrice
              )}{" "}
              <LabelChip label={pair.underlyingLabel} />
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
          <LoadingButton
            variant="contained"
            loadingPosition="end"
            endIcon={isLoading && <CircularProgress size={22} color="info" />}
            loading={isLoading}
            onClick={() => write?.()}
            disabled={isLoading}
            sx={(theme) => ({
              color: theme.palette.text.primary,
              ":disabled": { color: theme.palette.text.disabled },
            })}
            fullWidth
            color={side === "buy" ? "success" : "error"}
          >
            {capitalizeFirstLetter(side)}
          </LoadingButton>
        </div>
      </Box>
    </Dialog>
  );
};

export default LimitConfirmation;

interface LabelChipProps {
  label: string;
}
function LabelChip({ label }: LabelChipProps) {
  return (
    <Chip
      label={label}
      variant="filled"
      size="small"
      color="secondary"
      sx={{ fontSize: 10, fontWeight: 600, marginTop: -0.2 }}
    />
  );
}
