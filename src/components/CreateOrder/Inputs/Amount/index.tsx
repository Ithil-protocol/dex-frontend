import { Box, FormGroup } from "@mui/material";
import { Control } from "react-hook-form";
import GroupButton from "./GroupButton";
import TextField from "./TextField";
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
};

export default Amount;
