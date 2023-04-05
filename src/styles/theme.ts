// import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "block",
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: "#f34444",
    },
    success: {
      main: "#30d46f",
    },
    info: {
      main: "#ffffff",
    },
    background: {
      default: "#2c374d",
      paper: "#18294b",
    },
    text: {
      primary: "#fff",
      secondary: "gray",
    },
  },
  typography: { fontFamily: roboto.style.fontFamily },
});

export default theme;
