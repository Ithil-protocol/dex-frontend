import { FormGroup, useTheme } from "@mui/material";
import { Control, FieldValues, useWatch } from "react-hook-form";
import AmountGroupButton from "./GroupButton";
import AmountLabel from "./Label";
import AmountTextField from "./TextField";
import WrapperBox from "components/Common/Box";
import { Side } from "types";

interface Props {
  available: string;
  control: Control<FieldValues, any>;
  pool: Pool;
  setValue: any;
}

const Amount: React.FC<Props> = ({ available, control, side, setValue }) => {
  const theme = useTheme();
  const { price } = useWatch({ control });

  const disabled = price == "" || price == 0 || price == undefined;

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
          endLabel={side?.underlying.label || ""}
          control={control}
        />

        <AmountGroupButton
          disabled={disabled}
          price={price}
          setValue={setValue}
        />
      </WrapperBox>
    </FormGroup>
  );
};

export default Amount;
