import { Box, FormGroup } from "@mui/material";
import { Control, FieldValues } from "react-hook-form";
import GroupButton from "./GroupButton";
import TextField from "./TextField";
import WrapperInputLabel from "@/components/Common/WrapperInputLabel";

interface Props<T extends FieldValues> {
  control: Control<T>;
  groupButtonHandler: (item: number) => void;
  groupButtonDisabled: boolean;
  availableLabel: string;
}

function Amount<FieldValue extends FieldValues>({
  availableLabel,
  control,
  groupButtonDisabled,
  groupButtonHandler,
}: Props<FieldValue>) {
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
          backgroundColor: theme.palette.background.default,
        })}
      >
        <TextField control={control} />
        <GroupButton
          disabled={groupButtonDisabled}
          groupButtonHandler={groupButtonHandler}
        />
      </Box>
    </FormGroup>
  );
}

export default Amount;
