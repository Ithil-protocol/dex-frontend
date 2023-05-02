import { providers } from "ethers";
import styles from "./LimitConfirmation.module.scss";
import { Chip, CircularProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

interface Props {
  fulfillLoading: boolean;
  waitedData: providers.TransactionReceipt | undefined;
  waitedError: boolean;
  waitedSuccess: boolean;
}

const TransactionResponse: React.FC<Props> = ({
  fulfillLoading,
  waitedError,
  waitedSuccess,
  waitedData,
}) => {
  return (
    <div className={styles.response}>
      {fulfillLoading ? (
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
                window.open(
                  `https://goerli.etherscan.io/tx/${waitedData?.transactionHash}`
                )
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
};

export default TransactionResponse;
