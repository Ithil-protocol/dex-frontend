import { Box, FormGroup, useTheme } from "@mui/material";
import { Control } from "react-hook-form";
import MarketAmountLabel from "./Label";
import MarketAmountTextField from "./TextField";
import { MarketInputs, Pool } from "types";
import { usePoolStore } from "store";
import MarketAmountGroupButton from "./GroupButton";

interface Props {
  available: string;
  control: Control<MarketInputs, any>;
  pool: Pool;
  price: number | string;
  setValue: any;
}

const MarketAmount: React.FC<Props> = ({ available, control, price }) => {
  const theme = useTheme();

  const pair = usePoolStore((state) => state.pair);
  const disabled = price === "" || Number(price) === 0 || price === undefined;

  return (
    <FormGroup>
      <MarketAmountLabel available={available} />

      <Box
        sx={{
          borderRadius: "5px",
          border: "2px solid transparent",
          "&:focus-within": {
            border: `2px solid ${theme.palette.primary.main}`,
          },
        }}
      >
        <MarketAmountTextField
          endLabel={pair?.underlyingLabel || ""}
          control={control}
        />

        <MarketAmountGroupButton
          disabled={disabled}
          price={Number(price)}
          setValue={console.log}
        />
      </Box>
    </FormGroup>
  );
};

export default MarketAmount;
