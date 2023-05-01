import { Box, Dialog } from "@mui/material";
import { BigNumber } from "ethers";
import { usePoolPreviewOrder } from "hooks/contracts/pool";
import { Dispatch, SetStateAction } from "react";
import { usePoolStore } from "store";

interface Props {
  price: BigNumber;
  amount: BigNumber;
  staked: BigNumber;
  write: (() => void) | undefined;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Confirmation: React.FC<Props> = ({
  amount,
  open,
  price,
  staked,
  write,
}) => {
  const [side, pool] = usePoolStore((state) => [state.side, state.pool]);

  const { data } = usePoolPreviewOrder({
    address: pool.address,
    args: [price, staked],
  });

  return (
    <Dialog open={open}>
      <Box>
        <Box></Box>
      </Box>
    </Dialog>
  );
};

export default Confirmation;
