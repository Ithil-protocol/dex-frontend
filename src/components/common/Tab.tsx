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
      disableRipple
      {...rest}
      sx={(theme) => ({
        textTransform: "none",
        color: color || theme.palette.text.disabled,
        backgroundColor: bgColor || theme.palette.background.paper,
        borderRadius: "5px",
        "&.Mui-selected": {
          color: selectedColor || theme.palette.text.primary,
          backgroundColor: selectedBgColor || theme.palette.primary.main,
        },
        "&.Mui-focusVisible": {
          backgroundColor: theme.palette.primary.main,
        },
      })}
    />
  );
};

export default WrapperTab;
