import { FormGroup } from "@mui/material";
import { useState } from "react";
import { Control, FieldValues } from "react-hook-form";
import theme from "styles/theme";
import { Pool } from "types";
import AmountGroupButton from "./GroupButton";
import AmountLabel from "./Label";
import AmountTextField from "./TextField";

interface Props {
  available: string;
  control: Control<FieldValues, any>;
  pool: Pool;
  setValue: any;
}

const Amount: React.FC<Props> = ({ available, control, pool, setValue }) => {
  const [isAmountFocused, setIsAmountFocused] = useState(false);

  return (
    <FormGroup>
      <AmountLabel available={available} />

      <div
        onFocus={(_event) => setIsAmountFocused(true)}
        onBlur={(_event) => setIsAmountFocused(false)}
        style={{
          border: isAmountFocused
            ? `2px solid ${theme.palette.secondary.main}`
            : "2px solid transparent",
          borderRadius: "5px",
        }}
      >
        <AmountTextField
          endLabel={pool?.underlyingLabel || ""}
          control={control}
        />

        <AmountGroupButton control={control} setValue={setValue} />
      </div>
    </FormGroup>
  );
};

export default Amount;
