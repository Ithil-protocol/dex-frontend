import React, { useState } from "react";
import { Control } from "react-hook-form";
import BoostLabel from "./Label";
import BoostTextField from "./TextField";

interface Props {
  control: Control<any, any>;
}

const Boost: React.FC<Props> = ({ control }) => {
  const [boost, setBoost] = useState(0);

  return (
    <div>
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
    </div>
  );
};

export default Boost;
