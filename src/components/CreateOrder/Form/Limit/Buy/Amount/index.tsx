import { Box, FormGroup } from "@mui/material";
import { Control } from "react-hook-form";
import LimitAmountGroupButton from "./GroupButton";
import LimitAmountTextField from "./TextField";
import { LimitInputs } from "types";
import WrapperInputLabel from "components/Common/WrapperInputLabel";

interface Props {
  available: string | number;
  control: Control<LimitInputs, any>;
  groupButtonDisabled: boolean;
  groupButtonHandler: (item: number) => void;
}

const LimitAmount: React.FC<Props> = ({
  available,
  control,
  groupButtonDisabled,
  groupButtonHandler,
}) => {
  return (
    <FormGroup>
      <WrapperInputLabel
        endLabel={`(${available})`}
        label="Amount"
        tooltip="Amount"
        htmlFor="amount"
      />
      <Box
        sx={(theme) => ({
          borderRadius: "5px",
          border: "2px solid transparent",
          "&:focus-within": {
            border: `2px solid ${theme.palette.primary.main}`,
          },
        })}
      >
        <LimitAmountTextField control={control} />

        <LimitAmountGroupButton
          disabled={groupButtonDisabled}
          groupButtonHandler={groupButtonHandler}
        />
      </Box>
    </FormGroup>
  );
};

export default LimitAmount;
