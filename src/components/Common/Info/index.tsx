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
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center", height: 14 }}>
      {isRendered && (
        <>
          {hasLoading && <CircularProgress size={12} color={color} />}
          <Typography fontSize={12} color={theme.palette[color].main}>
            {text}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default Info;
