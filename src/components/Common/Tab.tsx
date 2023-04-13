import { Tab as MuiTab } from "@mui/material";
import { Property } from "csstype";

interface Props {
  label: string;
  bgColor?: Property.Color;
  color?: Property.Color;
  selectedColor?: Property.Color;
  selectedBgColor?: Property.Color;
}

const WrapperTab: React.FC<Props> = ({
  selectedColor,
  color,
  bgColor,
  selectedBgColor,
  ...rest
}) => {
  return (
    <MuiTab
      {...rest}
      sx={(theme) => ({
        textTransform: "none",
        color: color || theme.palette.text.disabled,
        backgroundColor: bgColor || theme.palette.background.paper,
        "&.Mui-selected": {
          color: selectedColor || theme.palette.text.primary,
          backgroundColor: selectedBgColor || theme.palette.primary.main,
        },
        "&.Mui-focusVisible": {
          backgroundColor: "none",
        },
      })}
    />
  );
};

export default WrapperTab;
