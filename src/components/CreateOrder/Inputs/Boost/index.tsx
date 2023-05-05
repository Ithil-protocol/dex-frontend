import { useState } from "react";
import { Control } from "react-hook-form";
import BoostLabel from "./Label";
import BoostTextField from "./TextField";
import { FormGroup } from "@mui/material";

interface Props {
  control: Control<any, any>;
  maxBoost: number;
  maxBoostLoading: boolean;
}

const Boost: React.FC<Props> = ({ control, maxBoost, maxBoostLoading }) => {
  const [boost, setBoost] = useState(0);
  const maxBoostHandler = !maxBoostLoading
    ? () => {
        setBoost(maxBoost);
      }
    : undefined;

  return (
    <FormGroup>
      <BoostLabel boost={boost} />

      <BoostTextField
        onMaxClick={() => {
          setBoost(0.1);
        }}
        control={control}
        onBoostChange={(event: any) => {
          setBoost(event.target.value);
        }}
      />
    </FormGroup>
  );
};

export default Boost;
