import { InputAdornment, TextField } from "@mui/material";
import FormGroup from "@mui/material/FormGroup/FormGroup";
import InputLabel from "@mui/material/InputLabel";
import { decimalRegex } from "data/regex";
import React, { ChangeEvent, useState } from "react";
import { useController } from "react-hook-form";
interface Props {
  endLabel: string;
  control: any;
}

export default React.forwardRef<HTMLDivElement, Props>(function Price(
  props,
  ref
) {
  const numberValidation = (value: any) => {
    return decimalRegex.test(value);
  };

  const {
    field: { ref: ref1, onChange, ...inputProps },
    fieldState: { error },
  } = useController({
    name: "price",
    defaultValue: 0,
    control: props.control,
    rules: { validate: numberValidation },
  });

  const [value, setValue] = useState(inputProps.value);

  return (
    <FormGroup>
      <InputLabel htmlFor="price"> Price</InputLabel>
      <TextField
        {...inputProps}
        onChange={(event) => {
          if (decimalRegex.test(event.target.value)) {
            onChange(Number(event.target.value));
            setValue(event.target.value);
          }
        }}
        value={value}
        inputRef={ref1}
        size="small"
        variant="outlined"
        id="price"
        autoComplete="off"
        error={!!error}
        helperText={error ? "Please enter a valid number" : ""}
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              <span style={{ color: "white" }}>{props.endLabel}</span>
            </InputAdornment>
          ),
        }}
        fullWidth
        required
      />
    </FormGroup>
  );
});
