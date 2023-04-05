import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip arrow {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[1],
    color: theme.palette.grey[800],
    fontSize: 14,
    padding: 10,
  },
  ".MuiTooltip-arrow": {
    color: theme.palette.text.primary,
  },
  maxWidth: "250px",
}));

export default LightTooltip;
