import { Box, Dialog, DialogTitle, Skeleton } from "@mui/material";
import { BigNumber } from "ethers";
import { usePoolPreviewOrder } from "hooks/contracts/pool";
import { Dispatch, SetStateAction } from "react";
import { usePoolStore } from "store";
import { LimitFinalValues } from "types";
import styles from "./LimitConfirmation.module.scss";
interface Props {
  finalValues: LimitFinalValues;
  write: (() => void) | undefined;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const LimitConfirmation: React.FC<Props> = ({ finalValues, open, write }) => {
  const [side, pool] = usePoolStore((state) => [state.side, state.pool]);

  const { data: preview, isLoading } = usePoolPreviewOrder({
    address: pool.address,
    args: [finalValues.price, finalValues.boost],
  });

  return (
    <Dialog open={open} fullWidth maxWidth={"sm"}>
      <DialogTitle align="center">Limit order confirmation</DialogTitle>
      <Box display={"flex"} flexDirection={"column"} px={6} py={3}>
        <div className={styles.price}>
          <span>Actual price</span>
          {isLoading ? <Skeleton height={20} /> : <span></span>}
        </div>
      </Box>
    </Dialog>
  );
};

export default LimitConfirmation;
