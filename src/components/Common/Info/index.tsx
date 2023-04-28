import { Box, CircularProgress, Typography } from "@mui/material";

interface Props {
  isRendered: boolean;
  text: string;
  hasLoading: boolean;
}

const LoadingInfo: React.FC<Props> = ({ isRendered, text, hasLoading }) => {
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center", height: 20 }}>
      {isRendered && (
        <>
          {hasLoading && <CircularProgress size={12} color="info" />}
          <Typography fontSize={12}>{text}</Typography>
        </>
      )}
    </Box>
  );
};

export default LoadingInfo;
