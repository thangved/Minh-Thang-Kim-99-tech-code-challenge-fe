import { createTheme, ThemeProvider } from "@mui/material";
import SwapPage from "./pages/swap";

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
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SwapPage />
    </ThemeProvider>
  );
}

export default App;
