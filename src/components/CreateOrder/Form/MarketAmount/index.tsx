import { Box, FormGroup, useTheme } from "@mui/material";
import { Control, FieldValues, useWatch } from "react-hook-form";
import AmountGroupButton from "./GroupButton";
import AmountLabel from "./Label";
import AmountTextField from "./TextField";
import { MarketInputs, Pool } from "types";
import { usePoolStore } from "store";

interface Props {
  available: string;
  control: Control<MarketInputs, any>;
  pool: Pool;
  setValue: any;
}

const Amount: React.FC<Props> = ({ available, control, pool, setValue }) => {
  const theme = useTheme();

  const pair = usePoolStore((state) => state.pair);

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

        {/* <AmountGroupButton
          disabled={disabled}
          price={price}
          setValue={setValue}
        /> */}
      </Box>
    </FormGroup>
  );
};

export default Amount;
