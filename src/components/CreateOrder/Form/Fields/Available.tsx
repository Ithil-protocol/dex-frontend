import { Box } from "@mui/material";
import React from "react";

interface Props {
  endLabel: string;
  available: string;
}

const Available: React.FC<Props> = (props) => {
  return (
    <Box
      sx={(theme) => ({
        color: theme.palette.text.primary,
        display: "flex",
        fontSize: 12,
        justifyContent: "space-between",
        padding: "0px 10px",
      })}
    >
      <span>Available {props.endLabel}</span>
      <span>{props.available}</span>
    </Box>
  );
};

export default Available;
