import { LoadingButton } from "@mui/lab";
import { CircularProgress } from "@mui/material";
import React from "react";
import { Control, useWatch } from "react-hook-form";

interface Props {
  label: string;
  control: Control<any, any>;
  write: (() => void) | undefined;
  isSubmitting: boolean;
}

const Submit: React.FC<Props> = ({ label, control, write, isSubmitting }) => {
  const formValues = useWatch({ control });

  return (
    <LoadingButton
      endIcon={isSubmitting && <CircularProgress size={22} color="inherit" />}
      loading={isSubmitting}
      fullWidth
      disabled={!formValues.price || !formValues.amount || !write}
      sx={(theme) => ({
        ":disabled": {
          backgroundColor: theme.palette.secondary.dark,
          color: theme.palette.text.primary,
        },
        ":hover": {
          backgroundColor: theme.palette.success.dark,
          color: theme.palette.text.primary,
        },
        backgroundColor: theme.palette.success.main,
        color: theme.palette.text.primary,
        padding: "10px",
        textTransform: "none",
        width: "100%",
      })}
      type="submit"
    >
      Buy {label}
    </LoadingButton>
  );
};

export default Submit;
