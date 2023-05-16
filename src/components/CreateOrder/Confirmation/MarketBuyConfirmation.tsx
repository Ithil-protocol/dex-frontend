import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
} from "@mui/material";
import { usePoolPreviewTake } from "@/hooks/contracts/pool";
import { usePoolStore } from "@/store";
import { MarketBuyFinalValues } from "@/types";
import styles from "./LimitConfirmation.module.scss";
import { useSellAmountConverter } from "@/hooks/converters";
import { capitalizeFirstLetter } from "@/utility";
import { LoadingButton } from "@mui/lab";
import { providers } from "ethers";

import { fixPrecision } from "@/utility/converters";
import TransactionResponse from "./TransactionResponse";
import RowContainer from "./RowContainer";
import { appConfig } from "@/config";

interface Props {
  finalValues: MarketBuyFinalValues;
  write: (() => void) | undefined;
  open: boolean;
  fulfillLoading: boolean;
  gasLoading: boolean;
  waitedData: providers.TransactionReceipt | undefined;
  waitedError: boolean;
  waitedSuccess: boolean;
  modalCloseHandler: () => void;
}

const MarketBuyConfirmation: React.FC<Props> = ({
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

  const sellAmountConverter = useSellAmountConverter();

  const { data: preview, isLoading: previewLoading } = usePoolPreviewTake({
    address: finalValues.pool.address,
    args: [finalValues.amount],
    watch: true,
  });

  return (
    <Dialog open={open} onClose={modalCloseHandler} fullWidth maxWidth={"xs"}>
      <DialogTitle fontWeight={800} align="center">
        market order confirmation
      </DialogTitle>
      <Box display={"flex"} flexDirection={"column"} px={6} py={3} gap={1}>
        <RowContainer
          label={pair.underlyingLabel}
          isLoading={previewLoading}
          title="You buy"
        >
          {preview && sellAmountConverter(finalValues.amount)}
        </RowContainer>
        <RowContainer
          label={pair.accountingLabel}
          isLoading={previewLoading}
          title="You pay"
        >
          {preview &&
            fixPrecision(
              finalValues.totalToPay,
              finalValues.pool.accounting.displayPrecision
            )}
        </RowContainer>
        <RowContainer
          label={pair.accountingLabel}
          isLoading={previewLoading}
          title="Max slippage"
        >
          {preview && appConfig.slippage(pair.tick) * 100 + "%"}
        </RowContainer>
        <RowContainer
          label={pair.accountingLabel}
          isLoading={previewLoading}
          title="Price"
        >
          {preview &&
            fixPrecision(
              finalValues.totalToPay,
              finalValues.pool.accounting.displayPrecision
            ) / sellAmountConverter(finalValues.amount)}
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

export default MarketBuyConfirmation;
