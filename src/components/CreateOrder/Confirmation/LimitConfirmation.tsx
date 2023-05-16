import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  Skeleton,
} from "@mui/material";
import { usePoolStore } from "@/store";
import { LimitFinalValues } from "@/types";
import styles from "./LimitConfirmation.module.scss";
import { useGetConvertersBySide } from "@/hooks/converters";
import { capitalizeFirstLetter } from "@/utility";
import { LoadingButton } from "@mui/lab";
import { providers } from "ethers";
import CheckIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { etherscanBaseUrl } from "@/config/blockExplorer";

interface Props {
  finalValues: LimitFinalValues;
  write: (() => void) | undefined;
  open: boolean;
  createLoading: boolean;
  gasLoading: boolean;
  waitedData: providers.TransactionReceipt | undefined;
  waitedError: boolean;
  waitedSuccess: boolean;
  modalCloseHandler: () => void;
}

const LimitConfirmation: React.FC<Props> = ({
  finalValues,
  open,
  write,
  gasLoading,
  createLoading,
  waitedData,
  waitedError,
  waitedSuccess,
  modalCloseHandler,
}) => {
  const [side, pair] = usePoolStore((state) => [state.side, state.pair]);

  const converters = useGetConvertersBySide(side);

  return (
    <Dialog open={open} onClose={modalCloseHandler} fullWidth maxWidth={"xs"}>
      <DialogTitle fontWeight={800} align="center">
        Limit order confirmation
      </DialogTitle>
      <Box display={"flex"} flexDirection={"column"} px={6} py={3} gap={1}>
        <RowContainer
          label={pair.accountingLabel}
          isLoading={false}
          title="Actual Price"
        >
          {converters.priceConverter(finalValues.actualPrice)}
        </RowContainer>
        <RowContainer
          label={pair.underlyingLabel}
          isLoading={false}
          title="Amount"
        >
          {converters.amountConverter(
            finalValues.amount,
            finalValues.actualPrice
          )}
        </RowContainer>
        <RowContainer label={"ETH"} isLoading={false} title="Boost">
          {converters.stakedConverter(finalValues.boost)}
        </RowContainer>
        <RowContainer isLoading={false} title="Orders before you">
          {finalValues.position.toNumber()}
        </RowContainer>
        <RowContainer
          label={pair.underlyingLabel}
          isLoading={false}
          title="Volume before you"
        >
          {converters.amountConverter(
            finalValues.cumulativeUndAmount,
            finalValues.actualPrice
          )}
        </RowContainer>

        <TransactionResponse
          createLoading={createLoading}
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
              (createLoading || gasLoading) && (
                <CircularProgress size={22} color="info" />
              )
            }
            loading={createLoading || gasLoading}
            onClick={() => write?.()}
            disabled={createLoading || gasLoading}
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

interface RowContainerProps {
  isLoading: boolean;
  children: React.ReactNode;
  title: string;
  label?: string;
}

function RowContainer({
  isLoading,
  children,
  title,
  label,
}: RowContainerProps) {
  return (
    <div className={styles.row}>
      <span>{title}</span>
      {isLoading ? (
        <Skeleton height={20} />
      ) : (
        <span>
          {children} {label && <LabelChip label={label} />}
        </span>
      )}
    </div>
  );
}

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

interface TransactionResponseProps {
  createLoading: boolean;
  waitedData: providers.TransactionReceipt | undefined;
  waitedError: boolean;
  waitedSuccess: boolean;
}

function TransactionResponse({
  createLoading,
  waitedError,
  waitedSuccess,
  waitedData,
}: TransactionResponseProps) {
  return (
    <div className={styles.response}>
      {createLoading ? (
        <div className={styles.response}>
          <CircularProgress size={148} color="success" />
        </div>
      ) : (
        (waitedError || waitedSuccess) && (
          <div className={styles.response}>
            {waitedSuccess && (
              <CheckIcon sx={{ fontSize: 100 }} color="success" />
            )}
            {waitedError && <CancelIcon sx={{ fontSize: 100 }} color="error" />}
            <Chip
              label={"Check on Etherscan"}
              size="medium"
              onClick={() =>
                window.open(etherscanBaseUrl + waitedData?.transactionHash)
              }
              variant="filled"
              color={waitedSuccess ? "success" : "error"}
              sx={(theme) => ({ color: theme.palette.info.main })}
            />
          </div>
        )
      )}
    </div>
  );
}
