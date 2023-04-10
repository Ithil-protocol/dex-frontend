// import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { cormorant, raleway } from "assets/font";

const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
      dark: "#177269",
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
});

export default theme;
