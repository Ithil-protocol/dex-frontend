import { Box, CircularProgress, Typography } from "@mui/material";

interface Props {
  isLoading: boolean;
  text: string;
}

const LoadingInfo: React.FC<Props> = ({ isLoading, text }) => {
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center", height: 20 }}>
      {isLoading && (
        <>
          <CircularProgress size={12} color="info" />
          <Typography fontSize={12}>{text}</Typography>
        </>
      )}
    </Box>
  );
};

export default LoadingInfo;
