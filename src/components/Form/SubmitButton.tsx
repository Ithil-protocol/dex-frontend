import { Button } from "@mui/material";
import React from "react";

const SubmitButton = () => {
  return (
    <Button
      fullWidth
      style={{
        backgroundColor: "#8a8a8a",
        color: "white",
        textTransform: "none",
      }}
    >
      Buy BTC
    </Button>
  );
};

export default SubmitButton;
