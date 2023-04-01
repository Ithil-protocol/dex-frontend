import { FormGroup, InputAdornment, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import React from "react";

const Amount = () => {
  return (
    <FormGroup>
      <TextField
        size="small"
        placeholder="Amount"
        variant="filled"
        InputProps={{
          disableUnderline: true,
          endAdornment: <InputAdornment position="start">BTC</InputAdornment>,
        }}
        fullWidth
      />
      <div style={{ display: "flex" }}>
        {["25%", "50%", "75%", "100%"].map((item, i) => {
          return (
            <Button
              style={{
                color: "#e3e3e378",
                width: "100%",
                border: "1px solid #6a7b7c33",
                borderRadius: 0,
              }}
              size="small"
              key={i}
            >
              {item}
            </Button>
          );
        })}
      </div>
      <div
        style={{
          color: "#e3e3e378",
          display: "flex",
          fontSize: 12,
          justifyContent: "space-between",
        }}
      >
        <span>Available USDT</span>
        <span>6,233,769.09</span>
      </div>
    </FormGroup>
  );
};

export default Amount;
