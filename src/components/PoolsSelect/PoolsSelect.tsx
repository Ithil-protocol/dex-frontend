import { Autocomplete, TextField } from "@mui/material";
import { pairs } from "data/pools";
import React from "react";
import { usePoolStore } from "store";
import { Pair, Pool } from "types/index";
import RenderOption from "./RenderOption";
import theme from "styles/theme";

function PoolsSelect() {
  const [pairValue, updatePair] = usePoolStore((state) => [
    state.pairValue,
    state.updatePair,
  ]);

  const handleChange = (_: React.SyntheticEvent, newValue: Pair) => {
    updatePair(newValue);
  };

  return (
    <Autocomplete
      sx={(theme) => ({
        borderBottom: `1px solid ${theme.palette.text.primary} `,
        "& .MuiSvgIcon-root": { fill: theme.palette.text.primary },
      })}
      value={pairs.find((option) => +option.value === pairValue)}
      onChange={handleChange}
      options={pairs}
      disableClearable
      getOptionLabel={(option: Pair) =>
        option["sell"].underlying.label + "/" + option["sell"].accounting.label
      }
      renderOption={RenderOption}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          color="info"
          InputLabelProps={{ style: { color: theme.palette.text.primary } }}
          inputProps={{
            ...params.inputProps,
            style: { color: theme.palette.text.primary },
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

export default PoolsSelect;
