import { Box, FormGroup, useTheme } from "@mui/material";
import { Control, useWatch } from "react-hook-form";
import LimitAmountGroupButton from "./GroupButton";
import LimitAmountLabel from "./Label";
import LimitAmountTextField from "./TextField";
import { LimitInputs, Pool } from "types";
import { usePoolStore } from "store";

interface Props {
  available: string;
  control: Control<LimitInputs, any>;
  pool: Pool;
  setValue: any;
}

const LimitAmount: React.FC<Props> = ({ available, control, setValue }) => {
  const theme = useTheme();
  const { price } = useWatch({ control });

  const pair = usePoolStore((state) => state.pair);

  const disabled = price == "" || Number(price) == 0 || price == undefined;

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
        <LimitAmountTextField
          endLabel={pair?.underlyingLabel || ""}
          control={control}
        />

        <LimitAmountGroupButton
          disabled={disabled}
          price={Number(price)}
          setValue={setValue}
        />
      </Box>
    </FormGroup>
  );
};

export default LimitAmount;
