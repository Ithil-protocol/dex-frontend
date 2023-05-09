import BoostLabel from "./Label";
import { FormGroup } from "@mui/material";
import BoostGroupButton from "./GroupButton";
import { BoostFactor } from "@/types";

interface Props {
  groupButtonHandler: (item: BoostFactor) => void;
  groupButtonDisabled: boolean;
  boost: number;
}

const Boost: React.FC<Props> = ({
  groupButtonDisabled,
  groupButtonHandler,
  boost,
}) => {
  return (
    <FormGroup>
      <BoostLabel boost={boost} />
      <BoostGroupButton
        disabled={groupButtonDisabled}
        groupButtonHandler={groupButtonHandler}
      />
    </FormGroup>
  );
};

export default Boost;
