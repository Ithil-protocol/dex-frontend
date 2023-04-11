import { FormGroup, useTheme } from "@mui/material";
import { Control, FieldValues } from "react-hook-form";
import { Pool } from "types";
import AmountGroupButton from "./GroupButton";
import AmountLabel from "./Label";
import AmountTextField from "./TextField";
import WrapperBox from "components/common/Box";

interface Props {
  available: string;
  control: Control<FieldValues, any>;
  pool: Pool;
  setValue: any;
}

const Amount: React.FC<Props> = ({ available, control, pool, setValue }) => {
  const theme = useTheme();

  return (
    <FormGroup>
      <AmountLabel available={available} />

      <WrapperBox
        overrideStyles={{
          border: "2px solid transparent",
          "&:focus-within": {
            border: `2px solid ${theme.palette.primary.main}`,
          },
        }}
      >
        <AmountTextField
          endLabel={pool?.underlyingLabel || ""}
          control={control}
        />

        <AmountGroupButton control={control} setValue={setValue} />
      </WrapperBox>
    </FormGroup>
  );
};

export default Amount;
