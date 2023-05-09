import { Autocomplete, TextField, useTheme } from "@mui/material";
import { pairs } from "@/data/pools";

import { usePoolStore } from "@/store";
import { Pair } from "@/types/index";
import RenderOption from "./RenderOption";

function PoolsSelect() {
  const theme = useTheme();

  const [pair, pairValue, updatePair] = usePoolStore((state) => [
    state.pair,
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
      value={pairs.find((option) => option.value === pairValue)}
      onChange={handleChange}
      options={pairs}
      disableClearable
      getOptionLabel={(option: Pair) =>
        option.underlyingLabel +
        "/" +
        option.accountingLabel +
        " | Tick " +
        pair.tick
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
