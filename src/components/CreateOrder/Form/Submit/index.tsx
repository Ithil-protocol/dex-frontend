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
      variant="contained"
      endIcon={isSubmitting && <CircularProgress size={22} color="inherit" />}
      loading={isSubmitting}
      fullWidth
      disabled={!formValues.price || !formValues.amount || !write}
      sx={{
        textTransform: "none",
        width: "100%",
      }}
      type="submit"
    >
      Buy {label}
    </LoadingButton>
  );
};

export default Submit;
