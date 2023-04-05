import { Box } from "@mui/material";
import React from "react";

interface Props {
  endLabel: string;
  available: string | undefined;
}

const Available: React.FC<Props> = ({ endLabel, available }) => {
  return (
    <Box
      sx={(theme) => ({
        color: theme.palette.text.primary,
        display: "flex",
        fontSize: 12,
        justifyContent: "space-between",
        // padding: "0px 10px",
      })}
    >
      <span>Available {endLabel}</span>
      <span>{available ? available : "0.0"}</span>
    </Box>
  );
};

export default Available;
