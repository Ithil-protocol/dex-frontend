import { TextField } from "@mui/material";
import { decimalRegex, getDecimalRegex } from "@/data/regex";
import { Control, useController } from "react-hook-form";
import { usePoolStore } from "@/store";

interface Props {
  endLabel: string;
  control: Control<any, any>;
}

const PriceTextField: React.FC<Props> = (props) => {
  const {
    field: { ref, onChange, ...inputProps },
    fieldState: { error },
  } = useController({
    control: props.control,
    defaultValue: "",
    name: "price",
  });

  const defaultPool = usePoolStore((state) => state.default);
  return (
    <TextField
      {...inputProps}
      onChange={(event) => {
        const { value } = event.target;
        if (
          getDecimalRegex(defaultPool.accounting.displayPrecision).test(
            value
          ) ||
          value === ""
        ) {
          console.log(Number(value));
          onChange(value);
        }
      }}
      placeholder="0"
      inputRef={ref}
      size="small"
      variant="outlined"
      id="price"
      autoComplete="off"
      error={!!error}
      helperText={error?.message}
      fullWidth
      required
    />
  );
};

export default PriceTextField;
