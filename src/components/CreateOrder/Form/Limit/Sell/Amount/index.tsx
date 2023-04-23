import { Box, FormGroup, useTheme } from "@mui/material";
import { Control, useWatch } from "react-hook-form";
import LimitAmountGroupButton from "./GroupButton";
import LimitAmountLabel from "./Label";
import LimitAmountTextField from "./TextField";
import { LimitInputs, Pool } from "types";
import { usePoolStore } from "store";

interface Props {
  available: number;
  control: Control<LimitInputs, any>;
  groupButtonHandler: (item: number) => void;
}

const LimitAmount: React.FC<Props> = ({
  available,
  control,
  groupButtonHandler,
}) => {
  const theme = useTheme();
  const disabled = available === 0;

  return (
    <FormGroup>
      <LimitAmountLabel available={available} />

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
          disabled={!!disabled}
          groupButtonHandler={groupButtonHandler}
        />
      </Box>
    </FormGroup>
  );
};

export default LimitAmount;
