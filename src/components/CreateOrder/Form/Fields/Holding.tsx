import { TextField } from "@mui/material";
import React from "react";

const HoldingField = () => {
  return (
    <TextField
      variant="filled"
      placeholder="what is ph?"
      InputProps={{ disableUnderline: true }}
      size="small"
      fullWidth
    />
  );
};

export default HoldingField;
