import { InputAdornment, TextField } from "@mui/material";
import FormGroup from "@mui/material/FormGroup/FormGroup";
import InputLabel from "@mui/material/InputLabel";
import { decimalRegex } from "data/regex";
import React, { useState } from "react";
import { Control, useController } from "react-hook-form";
import theme from "styles/theme";

interface Props {
  endLabel: string;
  control: Control<any, any>;
}

export default React.forwardRef<HTMLDivElement, Props>(function Price(props) {
  const numberValidation = (value: any) => {
    return decimalRegex.test(value);
  };

  const {
    field: { ref: ref1, onChange, ...inputProps },
    fieldState: { error },
  } = useController({
    name: "price",
    defaultValue: "",
    control: props.control,
    rules: { validate: numberValidation },
  });

  const [value, setValue] = useState(inputProps.value);

  return (
    <FormGroup>
      <InputLabel
        sx={(theme) => ({ color: theme.palette.text.primary })}
        htmlFor="price"
      >
        {" "}
        Price
      </InputLabel>
      <TextField
        {...inputProps}
        onChange={(event) => {
          if (decimalRegex.test(event.target.value)) {
            onChange(Number(event.target.value));
            setValue(event.target.value);
          }
        }}
        placeholder="0"
        value={value}
        inputRef={ref1}
        size="small"
        variant="outlined"
        id="price"
        autoComplete="off"
        error={!!error}
        helperText={error ? "Please enter a valid number" : ""}
        InputProps={{
          sx: (theme) => ({
            backgroundColor: theme.palette.background.default,
          }),
          endAdornment: (
            <InputAdornment position="end">
              <span style={{ color: theme.palette.text.primary }}>
                {props.endLabel}
              </span>
            </InputAdornment>
          ),
        }}
        fullWidth
        required
      />
    </FormGroup>
  );
});
