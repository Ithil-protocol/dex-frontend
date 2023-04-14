import { LoadingButton } from "@mui/lab";
import { CircularProgress } from "@mui/material";
import React from "react";
import { Control, useWatch } from "react-hook-form";

interface Props {
  label: string;
  control: Control<any, any>;
  write: (() => void) | undefined;
  isSubmitting: boolean;
  approve: (() => void) | undefined;
}

const Submit: React.FC<Props> = ({
  label,
  control,
  write,
  isSubmitting,
  approve,
}) => {
  const formValues = useWatch({ control });
  const approved = () => {
    if (!!write === false && !!approve === true) {
      return false;
    } else if (!!write === true && !!approve === false) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <LoadingButton
      variant="contained"
      endIcon={isSubmitting && <CircularProgress size={22} color="inherit" />}
      loading={isSubmitting}
      fullWidth
      disabled={!formValues.price || !formValues.amount || approved()}
      sx={{
        textTransform: "none",
        width: "100%",
      }}
      type="submit"
    >
      {approve ? "Approve first" : `Buy ${label}`}
    </LoadingButton>
  );
};

export default Submit;
