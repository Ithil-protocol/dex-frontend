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

  return (
    <FormGroup>
      <BoostLabel boost={boost} />

      <BoostTextField
        maxBoost={maxBoost}
        maxBoostLoading={maxBoostLoading}
        control={control}
        onBoostChange={(event: any) => {
          setBoost(event.target.value);
        }}
        setBoost={setBoost}
      />
    </FormGroup>
  );
};

export default Boost;
