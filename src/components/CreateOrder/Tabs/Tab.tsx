import { Tab as MuiTab } from "@mui/material";
import { Property } from "csstype";

interface Props {
  label: string;
  color?: Property.Color;
  selectedColor?: Property.Color;
}

const Tab: React.FC<Props> = ({ selectedColor, color, ...rest }) => {
  return (
    <MuiTab
      disableRipple
      {...rest}
      sx={(theme) => ({
        fontWeight: "bold",
        textTransform: "none",
        color: color || theme.palette.text.disabled,
        "&.Mui-selected": {
          color: selectedColor || "white",
          backgroundColor: theme.palette.secondary.main,
        },
        "&.Mui-focusVisible": {
          backgroundColor: theme.palette.primary.main,
        },
      })}
    />
  );
};

export default Tab;
