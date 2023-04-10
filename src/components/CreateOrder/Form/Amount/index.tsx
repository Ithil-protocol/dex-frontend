import { Box, FormGroup } from "@mui/material";
import { Control, FieldValues } from "react-hook-form";
import theme from "styles/theme";
import { Pool } from "types";
import AmountGroupButton from "./GroupButton";
import AmountLabel from "./Label";
import AmountTextField from "./TextField";

interface Props {
  available: string;
  control: Control<FieldValues, any>;
  pool: Pool;
  setValue: any;
}

const Amount: React.FC<Props> = ({ available, control, pool, setValue }) => {
  return (
    <FormGroup>
      <AmountLabel available={available} />

      <Box
        sx={{
          border: "2px solid transparent",
          "&:focus-within": {
            border: `2px solid ${theme.palette.success.main}`,
          },
          borderRadius: "5px",
        }}
      >
        <AmountTextField
          endLabel={pool?.underlyingLabel || ""}
          control={control}
        />

        <AmountGroupButton control={control} setValue={setValue} />
      </Box>
    </FormGroup>
  );
};

export default Amount;
