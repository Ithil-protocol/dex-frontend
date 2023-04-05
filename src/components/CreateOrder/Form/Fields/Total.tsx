import { Box } from "@mui/material";
import React from "react";
import { Control, useWatch } from "react-hook-form";
import theme from "styles/theme";

interface Props {
  label: string;
  control: Control<any, any>;
}

const Total: React.FC<Props> = ({ label, control }) => {
  const formValues = useWatch({ control });
  const total = formValues.amount * formValues.price || 0;

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.background.default,
        borderRadius: "5px",
        display: "flex",
        gap: 5,
        justifyContent: "space-between",
        padding: "15px",
      })}
    >
      <span style={{ color: theme.palette.text.primary }}>Total</span>
      <span style={{ display: "flex", width: "100%" }}>{total}</span>
      <span>{label}</span>
    </Box>
  );
};

export default Total;
