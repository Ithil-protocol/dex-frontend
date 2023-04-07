import { Button } from "@mui/material";
import React from "react";
import { Control, useWatch } from "react-hook-form";

interface Props {
  label: string;
  control: Control<any, any>;
  write: (() => void) | undefined;
}

const Submit: React.FC<Props> = ({ label, control, write }) => {
  const formValues = useWatch({ control });

  return (
    <Button
      fullWidth
      disabled={!formValues.price || !formValues.amount || !write}
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
