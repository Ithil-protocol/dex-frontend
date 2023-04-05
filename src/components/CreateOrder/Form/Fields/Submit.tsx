import { Button } from "@mui/material";
import React from "react";
import { Control, useWatch } from "react-hook-form";

interface Props {
  label: string;
  control: Control<any, any>;
}

const Submit: React.FC<Props> = ({ label, control }) => {
  const formValues = useWatch({ control });
  console.log(formValues);

  return (
    <Button
      fullWidth
      disabled={!formValues.price || !formValues.amount}
      sx={(theme) => ({
        padding: "10px",
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.text.primary,
        textTransform: "none",
        ":disabled": {
          color: theme.palette.text.disabled,
          backgroundColor: theme.palette.secondary.main,
        },
        ":hover": {
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.text.primary,
        },
      })}
      type="submit"
    >
      Buy {label}
    </Button>
  );
};

export default Submit;
