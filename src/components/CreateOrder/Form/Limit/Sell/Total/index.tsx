import { Box } from "@mui/material";

import { Control, useWatch } from "react-hook-form";
import { truncateString } from "utility";

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
        borderRadius: "5px",
        backgroundColor: theme.palette.background.default,
        display: "flex",
        gap: 1,
        justifyContent: "space-between",
        padding: "15px 10px 10px 10px",
      })}
    >
      <span>Total</span>
      <span style={{ display: "flex", width: "100%" }}>
        {truncateString(total.toString(), 15)}
      </span>
      <span>{label}</span>
    </Box>
  );
};

export default Total;
