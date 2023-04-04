import { InputAdornment, TextField } from "@mui/material";
import React from "react";

interface Props {
  endLabel: string;
  onKeyDown: React.KeyboardEventHandler<
    HTMLDivElement | HTMLTextAreaElement | HTMLInputElement
  >;
}

export default React.forwardRef<HTMLDivElement, Props>(function Price(
  props,
  ref
) {
  return (
    <TextField
      {...props}
      ref={ref}
      name="price"
      type="number"
      variant="filled"
      placeholder="Price"
      autoComplete="off"
      InputProps={{
        onKeyDown: props.onKeyDown,
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
