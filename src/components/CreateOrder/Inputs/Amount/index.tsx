import { Box, FormGroup } from "@mui/material";
import { Control } from "react-hook-form";
import AmountGroupButton from "./GroupButton";
import AmountTextField from "./TextField";
import WrapperInputLabel from "@/components/Common/WrapperInputLabel";

interface Props {
  control: Control<any, any>;
  groupButtonHandler: (item: number) => void;
  groupButtonDisabled: boolean;
  availableLabel: string;
}

const Amount: React.FC<Props> = ({
  availableLabel,
  control,
  groupButtonDisabled,
  groupButtonHandler,
}) => {
  return (
    <FormGroup>
      <WrapperInputLabel
        endLabel={`(${availableLabel})`}
        label="Amount"
        tooltip="How much you are selling or buying"
        htmlFor="amount"
      />
      <Box
        sx={(theme) => ({
          "&:focus-within": {
            border: `2px solid ${theme.palette.primary.main}`,
          },
          border: "2px solid transparent",
          borderRadius: "5px",
          backgroundColor: theme.palette.background.default,
        })}
      >
        <AmountTextField control={control} />
        <AmountGroupButton
          disabled={groupButtonDisabled}
          groupButtonHandler={groupButtonHandler}
        />
      </Box>
    </FormGroup>
  );
};

export default Amount;
