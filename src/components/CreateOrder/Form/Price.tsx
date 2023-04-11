import { InputAdornment, TextField } from "@mui/material";
import FormGroup from "@mui/material/FormGroup/FormGroup";
import InputLabel from "@mui/material/InputLabel";
import InfoTooltip from "components/common/InfoTooltip";
import { decimalRegex } from "data/regex";
import React, { useState } from "react";
import { Control, useController } from "react-hook-form";
import theme from "styles/theme";

interface Props {
  endLabel: string;
  control: Control<any, any>;
}

const PriceTextField: React.FC<Props> = (props) => {
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
        sx={(theme) => ({
          color: theme.palette.text.primary,
          fontSize: 14,
          display: "flex",
          alignItems: "center",
        })}
        htmlFor="price"
      >
        Price
        <InfoTooltip title="Price" />
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
        sx={{ "& fieldset": { border: "none" } }}
        inputRef={ref1}
        size="small"
        variant="outlined"
        id="price"
        autoComplete="off"
        error={!!error}
        helperText={error ? "Please enter a valid number" : ""}
        InputProps={{
          sx: (theme) => ({
            "&.Mui-focused": {
              border: `2px solid ${theme.palette.success.main}`,
            },
            backgroundColor: theme.palette.background.default,
            border: "2px solid transparent",
            borderRadius: "5px",
            padding: "5px 15px 5px 5px",
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
};

export default PriceTextField;
