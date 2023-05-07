import Label from "./Label";
import { FormGroup } from "@mui/material";
import GroupButton from "./GroupButton";
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
      <Label boost={boost} />
      <GroupButton
        disabled={groupButtonDisabled}
        groupButtonHandler={groupButtonHandler}
      />
    </FormGroup>
  );
};

export default Boost;
