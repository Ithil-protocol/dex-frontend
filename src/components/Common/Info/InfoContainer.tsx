import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
  height?: number;
}

const InfoContainer: React.FC<Props> = ({ children, height = 16 }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        justifyContent: "center",
        height,
      }}
    >
      {children}
    </Box>
  );
};

export default InfoContainer;
