import React, { useState, useEffect } from "react";
import Routes from "./routes";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { ptBR } from "@material-ui/core/locale";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Switch, FormGroup, FormControlLabel, makeStyles } from "@material-ui/core";
import whatsBackground from "../src/assets/wa-background.png";
import whatsBackground2 from "../src/assets/wa-background-black.png";

const useStyles = makeStyles(() => ({
  switch: {
    margin: "2px",
    position: 'absolute', right: 0
  },
}));

const App = () => {
  const [locale, setLocale] = useState();
  const [checked, setChecked] = React.useState(false);
  const classes = useStyles();

  const lightTheme = createTheme(
    {
      scrollbarStyles: {
        "&::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
          backgroundColor: "#e8e8e8",
        },
      },
      palette: {
        primary: { main: "#2576d2" },
      },
      backgroundImage: `url(${whatsBackground})`,
    },
    locale
  );

  const darkTheme = createTheme(
    {
      overrides: {
        MuiCssBaseline: {
          "@global": {
            body: {
              backgroundColor: "#080d14"
            }
          }
        }
      },
      scrollbarStyles: {
        "&::-webkit-scrollbar": {
          width: "8px",
          height: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
          backgroundColor: "#ffffff",
        },
      },
      palette: {
        primary: { main: "#ABFF03" },
        secondary: { main: "#FF8B08" },
        background: {
          default:  "#080d14",
          paper: "#181d22", 
        },
        text: {
          primary: '#ABFF03',
          secondary: '#ffffff',
        },
      },
      backgroundImage: `url(${whatsBackground2})`,
    },
    locale
  );

  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
    if(checked === false)
    {
      themeToggler();
    }
    else if (checked === true ){
      themeToggler();
    }
  };

  useEffect(() => {
    const i18nlocale = localStorage.getItem("i18nextLng");
    const browserLocale =
      i18nlocale.substring(0, 2) + i18nlocale.substring(3, 5);

    if (browserLocale === "ptBR") {
      setLocale(ptBR);
    }
  }, []);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Routes />

    </ThemeProvider>
  );
};

export default App;
