import { useState } from "react";
import { Control } from "react-hook-form";
import BoostLabel from "./Label";
// import BoostTextField from "./TextField";
import { Box, FormGroup } from "@mui/material";
import BoostGroupButton from "./GroupButton";
import { BoostName } from "@/types";

interface Props {
  groupButtonHandler: (item: number) => void;
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
