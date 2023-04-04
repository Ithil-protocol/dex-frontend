import { FormGroup, InputAdornment, TextField } from "@mui/material";
import React from "react";
import Slider from "./Slider";

interface Props {
  endLabel: string;
  onKeyDown: React.KeyboardEventHandler<
    HTMLDivElement | HTMLTextAreaElement | HTMLInputElement
  >;
}

export default React.forwardRef<HTMLDivElement, Props>(function Amount(
  props,
  ref
) {
  return (
    <FormGroup>
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
          onKeyDown: props.onKeyDown,
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

      <div
        style={{
          padding: "0px 10px 0px",
          marginTop: 5,
        }}
      >
        <Slider
          min={0}
          max={100}
          valueLabelFormat={(value) => (
            <span
              style={{
                fontSize: 14,
              }}
            >
              {value} %
            </span>
          )}
          valueLabelDisplay="auto"
          step={5}
        />
      </div>

      <div
        style={{
          color: "#e3e3e378",
          display: "flex",
          fontSize: 12,
          justifyContent: "space-between",
        }}
      >
        <span>Available {props.endLabel}</span>
        <span>6,233,769.09</span>
      </div>
    </FormGroup>
  );
});
