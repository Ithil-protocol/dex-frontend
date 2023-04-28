import { PaletteOptions, createTheme } from "@mui/material/styles";
import { cormorant, raleway } from "assets/font";

let theme = createTheme({
  palette: {
    background: {
      default: "#2c374d",
      paper: "#18294b",
    },
    error: {
      dark: "#B11616",
      main: "#EB0000",
    },
    info: {
      main: "#ffffff",
    },
    primary: {
      light: "#077CE0",
      main: "#0058A5",
    },
    secondary: {
      dark: "#4E5F71",
      light: "#A4B1BE",
      main: "#E5EBED",
    },
    success: {
      dark: "#0C6450",
      main: "#15AC89",
    },
    text: {
      disabled: "#e3e3e378",
      primary: "#ffffff",
      secondary: "#4E5F71",
    },
    warning: {
      dark: "#B85600",
      main: "#F07000",
    },
  },
});

theme = createTheme(theme, {
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          ":disabled": {
            backgroundColor: theme.palette.secondary.dark,
            color: theme.palette.text.disabled,
          },
          ":hover": {
            backgroundColor: theme.palette.success.main,
            color: theme.palette.text.primary,
          },
          backgroundColor: theme.palette.success.main,
          color: theme.palette.text.primary,
          fontWeight: 500,
          padding: "10px",
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
          fontSize: 14,
          padding: "5px",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.default,
          padding: "5px 15px 5px 5px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "5px",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          borderRadius: "5px",
          fontSize: 16,
          fontWeight: 500,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          borderBottom: "2px solid transparent",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:last-child td, &:last-child th": {
            border: 0,
          },
          "&:not(:last-child)": {
            borderBottom: `2px solid ${theme.palette.background.default}`,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          "& .MuiTabs-indicator": {
            background: "unset",
          },
          padding: "5px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& input": {
            "-moz-appearance": "textfield",
          },
          "& input::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
          },
          "& input::-webkit-outer-spin-button": {
            "-webkit-appearance": "none",
            margin: 0,
          },
          borderRadius: "15px",
        },
      },
    },
  },

  typography: {
    fontFamily: raleway.style.fontFamily,
    h1: {
      fontFamily: cormorant.style.fontFamily,
    },
    h2: {
      fontFamily: cormorant.style.fontFamily,
    },
    h3: {
      fontFamily: cormorant.style.fontFamily,
    },
    h4: {
      fontFamily: cormorant.style.fontFamily,
    },
    h5: {
      fontFamily: cormorant.style.fontFamily,
    },
    h6: {
      fontFamily: cormorant.style.fontFamily,
    },
  },
});

export default theme;
