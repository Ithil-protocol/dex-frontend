import { useState } from "react";
import { Control } from "react-hook-form";
import BoostLabel from "./Label";
// import BoostTextField from "./TextField";
import { Box, FormGroup } from "@mui/material";
import BoostGroupButton from "./GroupButton";
import { BoostName } from "@/types";

interface Props {
  control: Control<any, any>;
  maxBoost: number;
  groupButtonHandler: (item: number) => void;
  groupButtonDisabled: boolean;
}

const Boost: React.FC<Props> = ({
  control,
  groupButtonDisabled,
  groupButtonHandler,
  maxBoost,
}) => {
  const [boost, setBoost] = useState(0);

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
