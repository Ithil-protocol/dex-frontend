import { Tab } from "@mui/material";
import { Property } from "csstype";

interface StyledTabProps {
  label: string;
  color?: Property.Color;
  selectedColor?: Property.Color;
}

export const StyledTab = ({
  selectedColor,
  color,
  ...rest
}: StyledTabProps) => {
  return (
    <Tab
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
