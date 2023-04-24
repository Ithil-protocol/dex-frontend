import { Box, FormGroup } from "@mui/material";
import { Control } from "react-hook-form";
import LimitAmountGroupButton from "./GroupButton";
import LimitAmountTextField from "./TextField";
import { LimitInputs } from "types";
import WrapperInputLabel from "components/Common/WrapperInputLabel";

interface Props {
  control: Control<any, any>;
  groupButtonHandler: (item: number) => void;
  groupButtonDisabled: boolean;
  availableLabel: string;
}

const LimitAmount: React.FC<Props> = ({
  availableLabel,
  control,
  groupButtonDisabled: disabled,
  groupButtonHandler,
}) => {
  return (
    <FormGroup>
      <WrapperInputLabel
        endLabel={`(${availableLabel})`}
        label="Amount"
        tooltip="Amount"
        htmlFor="amount"
      />
      <Box
        sx={(theme) => ({
          "&:focus-within": {
            border: `2px solid ${theme.palette.primary.main}`,
          },
          border: "2px solid transparent",
          borderRadius: "5px",
        })}
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
