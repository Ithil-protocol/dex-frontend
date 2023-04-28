import { Box, CircularProgress, Typography } from "@mui/material";

interface Props {
  isRendered: boolean;
  text: string;
  hasLoading: boolean;
  color?:
    | "error"
    | "success"
    | "inherit"
    | "info"
    | "primary"
    | "secondary"
    | "warning";
}

const Info: React.FC<Props> = ({ isRendered, text, hasLoading, color }) => {
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center", height: 20 }}>
      {isRendered && (
        <>
          {hasLoading && <CircularProgress size={12} color={color ?? "info"} />}
          <Typography fontSize={12}>{text}</Typography>
        </>
      )}
    </Box>
  );
};

export default Info;
