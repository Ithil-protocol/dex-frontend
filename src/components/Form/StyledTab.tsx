import { Tab } from "@mui/material";
import { Property } from "csstype";

interface StyledTabProps {
  label: string;
  color?: Property.Color;
  selectedColor?: Property.Color;
}

export const StyledTab = (props: StyledTabProps) => {
  return (
    <Tab
      disableRipple
      {...props}
      sx={{
        fontWeight: "bold",
        textTransform: "none",
        color: props.color || "#e3e3e378",
        "&.Mui-selected": {
          color: props.selectedColor || "white",
          backgroundColor: "#284F5B",
        },
        "&.Mui-focusVisible": {
          backgroundColor: "rgba(100, 95, 228, 0.32)",
        },
      }}
    />
  );
};
