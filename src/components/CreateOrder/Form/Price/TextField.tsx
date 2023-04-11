import { InputAdornment, TextField } from "@mui/material";
import { decimalRegex } from "data/regex";
import React, { useState } from "react";
import { Control, useController } from "react-hook-form";

interface Props {
  endLabel: string;
  control: Control<any, any>;
}

const PriceTextField: React.FC<Props> = (props) => {
  const numberValidation = (value: any) => {
    return decimalRegex.test(value);
  };

  const {
    field: { ref: ref1, onChange, ...inputProps },
    fieldState: { error },
  } = useController({
    control: props.control,
    defaultValue: "",
    name: "price",
    rules: {
      validate: numberValidation,
    },
  });

  const [value, setValue] = useState(inputProps.value);

  return (
    <TextField
      {...inputProps}
      onChange={(event) => {
        if (decimalRegex.test(event.target.value)) {
          onChange(Number(event.target.value));
          setValue(event.target.value);
        }
      }}
      placeholder="0"
      value={value}
      inputRef={ref1}
      size="small"
      variant="outlined"
      id="price"
      autoComplete="off"
      error={!!error}
      helperText={error ? "Please enter a valid number" : ""}
      InputProps={{
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

export default PriceTextField;
