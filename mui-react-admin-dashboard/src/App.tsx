// baseline will reset our css to the defaults, that we need.
// themeprovider, is going to provide that theme - ability to pass themes into the material ui
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme/theme";
import MapContainer from "./components/MapContainer";

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="flex relative">
          <main className="content">
            <MapContainer />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
