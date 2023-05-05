import { Button, InputAdornment, TextField } from "@mui/material";
import { decimalRegex } from "@/data/regex";

import { useController } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";

interface Props {
  onBoostChange: (...args: any[]) => void;
  control: any;
  maxBoost: number;
  maxBoostLoading: boolean;
  setBoost: Dispatch<SetStateAction<number>>;
}

const BoostTextField: React.FC<Props> = ({
  control,
  onBoostChange,
  maxBoost,
  maxBoostLoading,
  setBoost,
}) => {
  const {
    field: { onChange, ...inputProps },
  } = useController({
    name: "boost",
    defaultValue: "",
    control,
  });

  const handleMaxClick = () => {
    setBoost(maxBoost);
    onChange(maxBoost);
  };

  return (
    <TextField
      {...inputProps}
      onChange={(event: any) => {
        const { value } = event.target;
        if (decimalRegex.test(value) || value === "") {
          onChange(value);
          onBoostChange(event);
        }
      }}
      autoComplete="off"
      id="boost"
      size="small"
      placeholder="0"
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Button
              disabled={maxBoostLoading}
              variant="contained"
              onClick={handleMaxClick}
              size="small"
              sx={(theme) => ({
                border: `1px solid  ${theme.palette.secondary.dark}`,
                minWidth: 0,
                padding: "5px",
                backgroundColor: "transparent",
                "&: hover": {
                  backgroundColor: "transparent",
                },
              })}
            >
              MAX
            </Button>
          </InputAdornment>
        ),
      }}
      fullWidth
    />
  );
};

export default BoostTextField;
