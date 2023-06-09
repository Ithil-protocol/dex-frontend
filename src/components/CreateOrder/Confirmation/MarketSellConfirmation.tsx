import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { usePoolPreviewTake } from "@/hooks/contracts/pool";
import { usePoolStore } from "@/store";
import { MarketSellFinalValues } from "@/types";
import styles from "./LimitConfirmation.module.scss";
import { capitalizeFirstLetter } from "@/utility";
import { LoadingButton } from "@mui/lab";
import { providers, utils } from "ethers";

import { fixPrecision } from "@/utility/converters";
import TransactionResponse from "./TransactionResponse";
import RowContainer from "./RowContainer";

interface Props {
  finalValues: MarketSellFinalValues;
  write: (() => void) | undefined;
  open: boolean;
  fulfillLoading: boolean;
  gasLoading: boolean;
  waitedData: providers.TransactionReceipt | undefined;
  waitedError: boolean;
  waitedSuccess: boolean;
  modalCloseHandler: () => void;
}

const MarketSellConfirmation: React.FC<Props> = ({
  finalValues,
  open,
  write,
  gasLoading,
  fulfillLoading,
  waitedData,
  waitedError,
  waitedSuccess,
  modalCloseHandler,
}) => {
  const [side, pair] = usePoolStore((state) => [state.side, state.pair]);

  const { data: preview, isLoading: previewLoading } = usePoolPreviewTake({
    address: finalValues.pool.address,
    args: [finalValues.amount],
    watch: true,
  });

  return (
    <Dialog open={open} onClose={modalCloseHandler} fullWidth maxWidth={"xs"}>
      <DialogTitle fontWeight={800} align="center">
        Market order confirmation
      </DialogTitle>
      <Box display={"flex"} flexDirection={"column"} px={6} py={3} gap={1}>
        <RowContainer
          label={pair.accountingLabel}
          isLoading={previewLoading}
          title="You obtain"
        >
          {preview &&
            fixPrecision(
              finalValues.totalToTake,
              finalValues.pool.underlying.displayPrecision
            )}
        </RowContainer>

        <RowContainer
          label={pair.underlyingLabel}
          isLoading={previewLoading}
          title="You sell (max)"
        >
          {preview &&
            fixPrecision(
              Number(
                utils.formatUnits(
                  finalValues.maxPaid,
                  finalValues.pool.accounting.decimals
                ) || 0
              ),
              finalValues.pool.accounting.displayPrecision
            )}
        </RowContainer>
        <RowContainer
          label={pair.underlyingLabel}
          isLoading={previewLoading}
          title="You sell (min)"
        >
          {preview &&
            fixPrecision(
              Number(
                utils.formatUnits(
                  finalValues.accountingToPay,
                  finalValues.pool.accounting.decimals
                ) || 0
              ),
              finalValues.pool.accounting.displayPrecision
            )}
        </RowContainer>

        <TransactionResponse
          fulfillLoading={fulfillLoading}
          waitedError={waitedError}
          waitedSuccess={waitedSuccess}
          waitedData={waitedData}
        />

        <div className={styles.buttons}>
          <Button
            onClick={modalCloseHandler}
            fullWidth
            variant="outlined"
            color="info"
          >
            Close
          </Button>
          <LoadingButton
            variant="contained"
            loadingPosition="end"
            endIcon={
              (fulfillLoading || gasLoading) && (
                <CircularProgress size={22} color="info" />
              )
            }
            loading={fulfillLoading || gasLoading}
            onClick={() => write?.()}
            disabled={fulfillLoading || gasLoading}
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

export default MarketSellConfirmation;
