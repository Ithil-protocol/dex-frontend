import { InputAdornment, TextField as MuiTextField } from "@mui/material";
import { getDecimalRegex } from "@/data/regex";
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  useController,
} from "react-hook-form";
import { usePoolStore } from "@/store";

interface Props<T extends FieldValues> {
  control: Control<T>;
}

function TextField<FieldValue extends FieldValues>(props: Props<FieldValue>) {
  const {
    field: { ref, onChange, ...inputProps },
    fieldState: { error },
  } = useController({
    name: "amount" as Path<FieldValue>,
    defaultValue: "" as PathValue<FieldValue, Path<FieldValue>>,
    control: props.control,
  });
  const pair = usePoolStore((state) => state.pair);

  return (
    <MuiTextField
      {...inputProps}
      onChange={(event) => {
        const { value } = event.target;
        if (
          getDecimalRegex(pair.sell.underlying.displayPrecision).test(value) ||
          value === ""
        ) {
          onChange(value);
        }
      }}
      placeholder="0"
      sx={{ "& fieldset": { border: "none" } }}
      id="amount"
      inputRef={ref}
      size="small"
      variant="outlined"
      autoComplete="off"
      error={!!error}
      helperText={error?.message}
      InputProps={{
        sx: {
          borderRadius: "5px 5px 0px 0px",
        },
        endAdornment: (
          <InputAdornment position="end">
            <span>{pair.underlyingLabel}</span>
          </InputAdornment>
        ),
      }}
      fullWidth
      required
    />
  );
}

export default TextField;
