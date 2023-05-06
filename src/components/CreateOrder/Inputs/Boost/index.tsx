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
  maxBoostLoading: boolean;
}

const Boost: React.FC<Props> = ({
  control,
  groupButtonDisabled,
  groupButtonHandler,
  maxBoost,
  maxBoostLoading,
}) => {
  const [boost, setBoost] = useState(0);

  return (
    <FormGroup>
      <BoostLabel boost={boost} />
      {/* <Box
        sx={(theme) => ({
          "&:focus-within": {
            border: `2px solid ${theme.palette.primary.main}`,
          },
          border: "2px solid transparent",
          borderRadius: "5px",
          backgroundColor: theme.palette.background.default,
        })}
      > */}
      {/* <BoostTextField
          maxBoost={maxBoost}
          maxBoostLoading={maxBoostLoading}
          control={control}
          onBoostChange={(event: any) => {
            setBoost(event.target.value);
          }}
          setBoost={setBoost}
        /> */}
      <BoostGroupButton
        disabled={groupButtonDisabled}
        groupButtonHandler={groupButtonHandler}
      />
      {/* </Box> */}
    </FormGroup>
  );
};

export default Boost;
