import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  Skeleton,
} from "@mui/material";
import { usePoolPreviewTake } from "hooks/contracts/pool";
import { Dispatch, SetStateAction } from "react";
import { usePoolStore } from "store";
import { MarketBuyFinalValues } from "types";
import styles from "./LimitConfirmation.module.scss";
import {
  useBuyAmountConverter,
  useGetConvertersBySide,
} from "hooks/converters";
import { capitalizeFirstLetter } from "utility";
import { LoadingButton } from "@mui/lab";
import { providers, utils } from "ethers";

import { appConfig } from "Config";
import { fixPrecision } from "utility/convertors";
import TransactionResponse from "./TransactionResponse";
import LabelChip from "./LabelChip";
import RowContainer from "./RowContainer";

interface Props {
  finalValues: MarketBuyFinalValues;
  write: (() => void) | undefined;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  fulfillLoading: boolean;
  gasLoading: boolean;
  waitedData: providers.TransactionReceipt | undefined;
  waitedError: boolean;
  waitedSuccess: boolean;
}

const MarketBuyConfirmation: React.FC<Props> = ({
  finalValues,
  open,
  setOpen,
  write,
  gasLoading,
  fulfillLoading,
  waitedData,
  waitedError,
  waitedSuccess,
}) => {
  const [side, pair] = usePoolStore((state) => [state.side, state.pair]);

  // const buyAmountConverter = useBuyAmountConverter();

  const { data: preview, isLoading: previewLoading } = usePoolPreviewTake({
    address: finalValues.pool.address,
    args: [finalValues.amount],
    watch: true,
  });

  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={closeHandler} fullWidth maxWidth={"xs"}>
      <DialogTitle fontWeight={800} align="center">
        market order confirmation
      </DialogTitle>
      <Box display={"flex"} flexDirection={"column"} px={6} py={3} gap={1}>
        <RowContainer
          label={pair.accountingLabel}
          isLoading={previewLoading}
          title="You obtain"
        >
          0
        </RowContainer>

        <TransactionResponse
          fulfillLoading={fulfillLoading}
          waitedError={waitedError}
          waitedSuccess={waitedSuccess}
          waitedData={waitedData}
        />

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
