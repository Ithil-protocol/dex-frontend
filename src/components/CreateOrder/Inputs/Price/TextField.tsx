import { TextField as MuiTextField } from "@mui/material";
import { getDecimalRegex } from "@/data/regex";
import { Control, useController } from "react-hook-form";
import { usePoolStore } from "@/store";

interface Props {
  endLabel: string;
  control: Control<any, any>;
}

const TextField: React.FC<Props> = (props) => {
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
    <MuiTextField
      {...inputProps}
      onChange={(event) => {
        const { value } = event.target;
        if (
          getDecimalRegex(defaultPool.accounting.displayPrecision).test(
            value
          ) ||
          value === ""
        ) {
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

export default TextField;
