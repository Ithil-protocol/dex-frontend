import { Dialog } from "@mui/material";
import { BigNumber } from "ethers";

interface Props {
  price: BigNumber;
  amount: BigNumber;
  staked: BigNumber;
  write: (() => void) | undefined;
  open: boolean;
}

const Confirmation: React.FC<Props> = ({
  amount,
  open,
  price,
  staked,
  write,
}) => {
  return <Dialog open={open}></Dialog>;
};

export default Confirmation;
