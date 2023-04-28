import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { ThemeColor } from "types";

interface Props {
  isRendered: boolean;
  text: string;
  hasLoading?: boolean;
  color?: ThemeColor;
}

const Info: React.FC<Props> = ({
  isRendered,
  text,
  hasLoading = false,
  color = "info",
}) => {
  const theme = useTheme();
  if (!isRendered) return null;

  return (
    <>
      {hasLoading && <CircularProgress size={12} color={color} />}
      <Typography fontSize={12} color={theme.palette[color].main}>
        {text}
      </Typography>
    </>
  );
};

export default Info;
