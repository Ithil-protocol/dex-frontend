import { Box, FormGroup, useTheme } from "@mui/material";
import { Control, FieldValues, useWatch } from "react-hook-form";
import AmountGroupButton from "./GroupButton";
import AmountLabel from "./Label";
import AmountTextField from "./TextField";
import { LimitInputs, Pool } from "types";
import { usePoolStore } from "store";

interface Props {
  available: string;
  control: Control<LimitInputs, any>;
  pool: Pool;
  setValue: any;
}

const Amount: React.FC<Props> = ({ available, control, pool, setValue }) => {
  const theme = useTheme();
  const { price } = useWatch({ control });

  const pair = usePoolStore((state) => state.pair);

  const disabled = price == "" || Number(price) == 0 || price == undefined;

  return (
    <FormGroup>
      <AmountLabel available={available} />

      <Box
        sx={{
          borderRadius: "5px",
          border: "2px solid transparent",
          "&:focus-within": {
            border: `2px solid ${theme.palette.primary.main}`,
          },
        }}
      >
        <AmountTextField
          endLabel={pair?.underlyingLabel || ""}
          control={control}
        />

        <AmountGroupButton
          disabled={disabled}
          price={Number(price)}
          setValue={setValue}
        />
      </Box>
    </FormGroup>
  );
};

export default Amount;
