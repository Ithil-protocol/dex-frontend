import { Button, InputAdornment, TextField } from "@mui/material";
import { decimalRegex } from "@/data/regex";

import { useController } from "react-hook-form";

interface Props {
  onBoostChange: (...args: any[]) => void;
  control: any;
  onMaxClick: (...args: any[]) => void;
}

const BoostTextField: React.FC<Props> = ({
  control,
  onBoostChange,
  onMaxClick,
}) => {
  const {
    field: { onChange, ...inputProps },
  } = useController({
    name: "boost",
    defaultValue: "",
    control,
  });

  const handleMaxClick = () => {
    onMaxClick();
    onChange(0.1);
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
