import styled from "@emotion/styled";
import { Slider as MuiSlider } from "@mui/material";

const Slider = styled(MuiSlider)({
  color: "#8A8A8A",
  height: 5,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 20,
    width: 20,
    backgroundColor: "#8A8A8A",
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
    borderRadius: 10,
    backgroundColor: "#8A8A8A",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%)  scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(0%, -100%)  scale(1)",
    },
  },
});

export default Slider;
