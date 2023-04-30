import { TextField } from "@mui/material";
import { decimalRegex } from "data/regex";
import { Control, useController } from "react-hook-form";

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

  return (
    <TextField
      {...inputProps}
      onChange={(event) => {
        const { value } = event.target;
        if (decimalRegex.test(value) || value === "") {
          onChange(value);
        }
      }}
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
