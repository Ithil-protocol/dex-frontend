import { InputAdornment, TextField } from "@mui/material";
import { decimalRegex } from "data/regex";
import React, { ChangeEvent, useState } from "react";
import { useController } from "react-hook-form";

interface Props {
  endLabel: string;
  control: any;
}

export default React.forwardRef<HTMLDivElement, Props>(function Price(
  props,
  ref
) {
  const numberValidation = (value: any) => {
    return decimalRegex.test(value);
  };

  const {
    field: { ref: ref1, onChange, ...inputProps },
    fieldState: { error },
  } = useController({
    name: "price",
    control: props.control,
    rules: { validate: numberValidation },
  });

  const [value, setValue] = useState(inputProps.value);

  return (
    <TextField
      {...inputProps}
      onChange={(event) => {
        onChange(Number(event.target.value));
        if (decimalRegex.test(event.target.value)) {
          setValue(event.target.value);
        }
      }}
      value={value}
      inputRef={ref1}
      size="small"
      variant="filled"
      placeholder="Price"
      autoComplete="off"
      error={!!error}
      helperText={error ? "Please enter a valid number" : ""}
      InputProps={{
        disableUnderline: true,
        endAdornment: (
          <InputAdornment position="end">
            <span style={{ color: "white" }}>{props.endLabel}</span>
          </InputAdornment>
        ),
        sx: {
          "& input[type=number]": {
            "-moz-appearance": "textfield",
          },
          "& input[type=number]::-webkit-outer-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
          },
          "& input[type=number]::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
          },
        },
      }}
      fullWidth
      required
    />
  );
});
