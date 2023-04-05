import styled from "@emotion/styled";
import { Slider as MuiSlider } from "@mui/material";
import theme from "styles/theme";

const CustomSlider = styled(MuiSlider)({
  color: theme.palette.secondary.main,
  height: 5,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 16,
    width: 16,
    backgroundColor: theme.palette.primary.main,
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: "0px 10px",
    width: "auto",
    height: 30,
    borderRadius: 5,
    backgroundColor: theme.palette.primary.main,
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%)  scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(0%, -100%)  scale(1)",
    },
  },
});

export default CustomSlider;
