import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      // main: '#556cd6',
      main: "#FFC529",
    },
    secondary: {
      main: "#FE724C",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
