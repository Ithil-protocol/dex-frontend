import { Box, FormGroup, useTheme } from "@mui/material";
import { Control } from "react-hook-form";
import LimitAmountGroupButton from "./GroupButton";
import LimitAmountTextField from "./TextField";
import { LimitInputs } from "types";
import WrapperInputLabel from "components/Common/WrapperInputLabel";

interface Props {
  control: Control<LimitInputs, any>;
  groupButtonHandler: (item: number) => void;
  disabled: boolean;
  availableLabel: string;
}

const LimitAmount: React.FC<Props> = ({
  control,
  groupButtonHandler,
  disabled,
  availableLabel,
}) => {
  const theme = useTheme();

  return (
    <FormGroup>
      <WrapperInputLabel
        endLabel={availableLabel}
        label="Amount"
        tooltip="Amount"
        htmlFor="amount"
      />
      <Box
        sx={{
          borderRadius: "5px",
          border: "2px solid transparent",
          "&:focus-within": {
            border: `2px solid ${theme.palette.primary.main}`,
          },
        }}
      >
        <LimitAmountTextField control={control} />
        <LimitAmountGroupButton
          disabled={disabled}
          groupButtonHandler={groupButtonHandler}
        />
      </Box>
    </FormGroup>
  );
};

export default LimitAmount;
