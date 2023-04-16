import { InputAdornment, TextField } from "@mui/material";
import { decimalRegex } from "data/regex";
import React, { useEffect, useState } from "react";
import { useController, useWatch } from "react-hook-form";

interface Props {
  endLabel: string;
  control: any;
}

const LimitAmountTextField: React.FC<Props> = (props) => {
  const [once, setOnce] = useState(false);
  const numberValidation = (value: any) => {
    return decimalRegex.test(value);
  };

  const {
    field: { ref: ref1, onChange, ...inputProps },
    fieldState: { error },
  } = useController({
    name: "amount",
    defaultValue: "",
    control: props.control,
    rules: { validate: numberValidation },
  });

  const [value, setValue] = useState(inputProps.value);

  const { amount: amountValue } = useWatch({ control: props.control });

  useEffect(() => {
    if (!once) {
      setOnce(true);
      return;
    }
    if (amountValue !== 0) {
      setValue(amountValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountValue, setValue, setOnce]);

  return (
    <TextField
      {...inputProps}
      onChange={(event) => {
        if (decimalRegex.test(event.target.value)) {
          onChange(Number(event.target.value));
          setValue(event.target.value);
        }
      }}
      sx={{ "& fieldset": { border: "none" } }}
      placeholder="0"
      id="amount"
      value={value}
      inputRef={ref1}
      size="small"
      variant="outlined"
      autoComplete="off"
      error={!!error}
      helperText={error ? "Please enter a valid number" : ""}
      InputProps={{
        sx: {
          borderRadius: "5px 5px 0px 0px",
        },
        endAdornment: (
          <InputAdornment position="end">
            <span>{props.endLabel}</span>
          </InputAdornment>
        ),
      }}
      fullWidth
      required
    />
  );
};

export default LimitAmountTextField;
