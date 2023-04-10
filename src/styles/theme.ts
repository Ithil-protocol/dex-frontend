// import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { cormorant, raleway } from "assets/font";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0058A5",
      light: "#077CE0",
    },
    secondary: {
      main: "#E5EBED",
      dark: "#4E5F71",
      light: "#A4B1BE",
    },
    error: {
      main: "#EB0000",
      dark: "#B11616",
    },
    success: {
      main: "#15AC89",
      dark: "#0C6450",
    },
    warning: {
      main: "#F07000",
      dark: "#B85600",
    },
    info: {
      main: "#ffffff",
    },
    background: {
      default: "#2c374d",
      paper: "#18294b",
    },
    text: {
      primary: "#ffffff",
      secondary: "#4E5F71",
      disabled: "#e3e3e378",
    },
  },
  typography: {
    fontFamily: raleway.style.fontFamily,
    h1: { fontFamily: cormorant.style.fontFamily },
    h2: { fontFamily: cormorant.style.fontFamily },
    h3: { fontFamily: cormorant.style.fontFamily },
    h4: { fontFamily: cormorant.style.fontFamily },
    h5: { fontFamily: cormorant.style.fontFamily },
    h6: { fontFamily: cormorant.style.fontFamily },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: 16,
        },
      },
    },
    MuiButton: { styleOverrides: { root: { fontWeight: 100 } } },
  },
});

export default theme;
