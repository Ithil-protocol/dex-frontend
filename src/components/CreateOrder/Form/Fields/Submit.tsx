import { Button } from "@mui/material";
import React from "react";

interface Props {
  label: string;
}

const Submit: React.FC<Props> = ({ label }) => {
  return (
    <Button
      fullWidth
      style={{
        backgroundColor: "#8a8a8a",
        color: "white",
        textTransform: "none",
      }}
    >
      Buy {label}
    </Button>
  );
};

export default Submit;
