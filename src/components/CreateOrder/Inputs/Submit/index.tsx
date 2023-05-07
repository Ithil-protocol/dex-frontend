/* eslint-disable indent */
import { LoadingButton } from "@mui/lab";
import { CircularProgress, Theme } from "@mui/material";

import { Control, FieldValues, useWatch } from "react-hook-form";
import { Side } from "@/types";

interface Props<T extends FieldValues> {
  control: Control<T>;
  isApproved: boolean;
  isLoading: boolean;
  isMarket?: boolean;
  side: Side;
  submitContent: string;
  write: (() => void) | undefined;
}

function Submit<FieldValue extends FieldValues>({
  control,
  isApproved,
  isLoading,
  isMarket = false,
  side,
  submitContent,
  write,
}: Props<FieldValue>) {
  const formValues = useWatch({ control });
  const approved = () => {
    if (!!write === false && isApproved === false) {
      return false;
    } else if (!!write === true && isApproved === true) {
      return false;
    } else {
      return true;
    }
  };
  const isDisabled = () => {
    if (isMarket) {
      return !formValues.amount;
    }
    return !formValues.price || !formValues.amount;
  };

  const styles =
    side === "buy"
      ? () => ({})
      : (theme: Theme) => ({
          backgroundColor: theme.palette.error.main,
          "&:hover": {
            backgroundColor: theme.palette.error.main,
          },
        });

  return (
    <LoadingButton
      variant="contained"
      loadingPosition="end"
      endIcon={isLoading && <CircularProgress size={22} color="inherit" />}
      loading={isLoading}
      fullWidth
      disabled={isDisabled() || approved()}
      sx={(theme) => ({
        textTransform: "none",
        width: "100%",
        ...styles(theme),
      })}
      type="submit"
    >
      {!isApproved ? "Approve first" : submitContent}
    </LoadingButton>
  );
}

export default Submit;
