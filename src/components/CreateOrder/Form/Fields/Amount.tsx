import { FormGroup, InputAdornment, TextField } from "@mui/material";
import React from "react";
import Slider from "./Slider";

interface Props {
  endLabel: string;
}

const Amount: React.FC<Props> = ({ endLabel }) => {
  return (
    <FormGroup>
      <TextField
        size="small"
        placeholder="Amount"
        variant="filled"
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="start">
              <span style={{ color: "white" }}>{endLabel}</span>
            </InputAdornment>
          ),
        }}
        fullWidth
      />

      <div
        style={{
          padding: "0px 10px 0px",
          marginTop: 5,
        }}
      >
        <Slider
          marks
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
        <span>Available {endLabel}</span>
        <span>6,233,769.09</span>
      </div>
    </FormGroup>
  );
};

export default Amount;
