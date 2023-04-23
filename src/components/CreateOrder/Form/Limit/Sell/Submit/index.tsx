/* eslint-disable indent */
import { LoadingButton } from "@mui/lab";
import { CircularProgress } from "@mui/material";

import { Control, useWatch } from "react-hook-form";
import { Side } from "types";

interface Props {
  label: string;
  control: Control<any, any>;
  write: (() => void) | undefined;
  isLoading: boolean;
  isMarket?: boolean;
  side: Side;
  isApproved: boolean;
}

const Submit: React.FC<Props> = ({
  label,
  control,
  write,
  isLoading,
  isMarket = false,
  side,
  isApproved,
}) => {
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
      : (theme) => ({
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
      {!isApproved ? "Approve first" : `Sell ${label}`}
    </LoadingButton>
  );
};

export default Submit;
