import { TextField } from "@mui/material";
import React from "react";

const Price = () => {
  return (
    <TextField
      variant="filled"
      placeholder="Price"
      InputProps={{ disableUnderline: true }}
      size="small"
      fullWidth
    />
  );
};

export default Price;
