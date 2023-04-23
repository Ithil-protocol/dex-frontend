import { Box, FormGroup } from "@mui/material";
import { Control } from "react-hook-form";
import MarketAmountTextField from "./TextField";
import { MarketInputs } from "types";
import MarketAmountGroupButton from "./GroupButton";
import WrapperInputLabel from "components/Common/WrapperInputLabel";

interface Props {
  availableLabel: string;
  control: Control<MarketInputs, any>;
  groupButtonDisabled: boolean;
  groupButtonHandler: (item: number) => void;
}

const MarketAmount: React.FC<Props> = ({
  control,
  groupButtonDisabled: disabled,
  groupButtonHandler,
  availableLabel,
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
          borderRadius: "5px",
          border: "2px solid transparent",
          "&:focus-within": {
            border: `2px solid ${theme.palette.primary.main}`,
          },
        })}
      >
        <MarketAmountTextField control={control} />

        <MarketAmountGroupButton
          disabled={disabled}
          groupButtonHandler={groupButtonHandler}
        />
      </Box>
    </FormGroup>
  );
};

export default MarketAmount;
