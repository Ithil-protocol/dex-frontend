import { InputAdornment, TextField } from "@mui/material";
import React from "react";

const Total = () => {
  return (
    <TextField
      size="small"
      placeholder="what is ph?"
      variant="filled"
      fullWidth
      InputProps={{
        disableUnderline: true,
        startAdornment: <InputAdornment position="start">Total</InputAdornment>,
        endAdornment: <InputAdornment position="start">USDT</InputAdornment>,
      }}
    />
  );
};

export default Total;
