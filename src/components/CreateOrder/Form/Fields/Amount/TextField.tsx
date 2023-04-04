import { InputAdornment, TextField } from "@mui/material";
import React from "react";

interface Props {
  endLabel: string;
}

export default React.forwardRef<HTMLDivElement, Props>(function AmountTextField(
  props,
  ref
) {
  return (
    <TextField
      {...props}
      ref={ref}
      name="amount"
      size="small"
      type="number"
      autoComplete="off"
      placeholder="Amount"
      variant="filled"
      InputProps={{
        inputMode: "numeric",
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
      fullWidth
      required
    />
  );
});
