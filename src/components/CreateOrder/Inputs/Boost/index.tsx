import BoostLabel from "./Label";
import { FormGroup } from "@mui/material";
import BoostGroupButton from "./GroupButton";
import { BoostFactor } from "@/types";

interface Props {
  groupButtonHandler: (item: BoostFactor) => void;
  groupButtonDisabled: boolean;
  boost: number;
  price: string;
  factor: BoostFactor;
}

const Boost: React.FC<Props> = ({
  groupButtonDisabled,
  groupButtonHandler,
  boost,
  factor,
  price,
}) => {
  return (
    <FormGroup>
      <BoostLabel boost={boost} />
      <BoostGroupButton
        factor={factor}
        price={price}
        disabled={groupButtonDisabled}
        groupButtonHandler={groupButtonHandler}
      />
    </FormGroup>
  );
};

export default Boost;
