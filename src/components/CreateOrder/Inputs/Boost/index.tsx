import BoostLabel from "./Label";
import { FormGroup } from "@mui/material";
import BoostGroupButton from "./GroupButton";
import { BoostFactor } from "@/types";

interface Props {
  groupButtonHandler: (item: BoostFactor) => void;
  groupButtonDisabled: boolean;
  boost: number;
  price: string;
}

const Boost: React.FC<Props> = ({
  groupButtonDisabled,
  groupButtonHandler,
  boost,
  price,
}) => {
  return (
    <FormGroup>
      <BoostLabel boost={boost} />
      <BoostGroupButton
        price={price}
        disabled={groupButtonDisabled}
        groupButtonHandler={groupButtonHandler}
      />
    </FormGroup>
  );
};

export default Boost;
