import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const InfoContainer: React.FC<Props> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        justifyContent: "center",
        height: 16,
      }}
    >
      {children}
    </Box>
  );
};

export default InfoContainer;
