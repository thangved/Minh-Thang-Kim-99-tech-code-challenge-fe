import SwapPage from "@/pages/swap";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  shape: {
    borderRadius: 12,
  },
  typography: {
    h2: {
      fontSize: "1.2rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1rem",
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        contained: {
          background: "linear-gradient(90deg,#f90cff,#6560ff,#0cd7e8)",
          ":disabled": {
            opacity: 0.8,
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#6560ff",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SwapPage />
    </ThemeProvider>
  );
}

export default App;
