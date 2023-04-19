/* eslint-disable indent */
import { LoadingButton } from "@mui/lab";
import { CircularProgress } from "@mui/material";

import { Control, useWatch } from "react-hook-form";
import { Side } from "types";

interface Props {
  label: string;
  control: Control<any, any>;
  write: (() => void) | undefined;
  isSubmitting: boolean;
  approve: (() => void) | undefined;
  isMarket?: boolean;
  side: Side;
}

const Submit: React.FC<Props> = ({
  label,
  control,
  write,
  isSubmitting,
  approve,
  isMarket = false,
  side,
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
  const isDisabled = () => {
    if (isMarket) {
      return !formValues.amount;
    }
    return !formValues.price || !formValues.amount;
  };

  const styles =
    side === "buy"
      ? () => ({})
      : (theme) => ({
          backgroundColor: theme.palette.error.main,
          "&:hover": {
            backgroundColor: theme.palette.error.main,
          },
        });

  return (
    <LoadingButton
      variant="contained"
      endIcon={isSubmitting && <CircularProgress size={22} color="inherit" />}
      loading={isSubmitting}
      fullWidth
      disabled={isDisabled() || approved()}
      sx={(theme) => ({
        textTransform: "none",
        width: "100%",
        ...styles(theme),
      })}
      type="submit"
    >
      {approve ? "Approve first" : `Buy ${label}`}
    </LoadingButton>
  );
};

export default Submit;
