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
      sx={{
        fontWeight: "bold",
        textTransform: "none",
        color: color || "#e3e3e378",
        "&.Mui-selected": {
          color: selectedColor || "white",
          backgroundColor: "#284F5B",
        },
        "&.Mui-focusVisible": {
          backgroundColor: "rgba(100, 95, 228, 0.32)",
        },
      }}
    />
  );
};

export default Tab;
