import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/system';
import { lightThemeOptions, darkThemeOptions } from './theme';
import { useRecoilState } from 'recoil';
import { paletteModeState } from './store';
import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

function App() {
  const [paletteMode,] = useRecoilState(paletteModeState);
  let muiTheme = (paletteMode === 'light') ? createTheme({palette: {mode: 'light'}},lightThemeOptions):
  createTheme({palette: {mode: 'dark'}},darkThemeOptions);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path ={'*'} element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;