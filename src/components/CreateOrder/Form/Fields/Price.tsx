import { InputAdornment, TextField } from "@mui/material";
import React from "react";

interface Props {
  endLabel: string;
}

const Price: React.FC<Props> = ({ endLabel }) => {
  return (
    <TextField
      variant="filled"
      placeholder="Price"
      InputProps={{
        disableUnderline: true,
        endAdornment: (
          <InputAdornment position="start">
            <span style={{ color: "white" }}>{endLabel}</span>
          </InputAdornment>
        ),
      }}
      size="small"
      fullWidth
    />
  );
};

export default Price;
