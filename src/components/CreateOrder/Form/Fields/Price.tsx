import { InputAdornment, TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

interface Props {
  endLabel: string;
}

export default React.forwardRef<HTMLDivElement, Props>(function Price(
  props,
  ref
) {
  const [value, setValue] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    // allow decimal numbers
    const decimalRegex = /^\d*\.?\d*$/;
    if (decimalRegex.test(inputValue)) {
      setValue(inputValue);
    }
  };

  return (
    <TextField
      {...props}
      value={value}
      onChange={handleInputChange}
      ref={ref}
      name="price"
      variant="filled"
      placeholder="Price"
      autoComplete="off"
      InputProps={{
        disableUnderline: true,
        endAdornment: (
          <InputAdornment position="start">
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
      size="small"
      fullWidth
      required
    />
  );
});
