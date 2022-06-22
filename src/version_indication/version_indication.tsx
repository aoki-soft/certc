import Box from '@mui/material/Box';
import { paletteModeState, themeState } from '../store';
import { lightTheme, darkTheme} from '../theme'
import { useRecoilState } from 'recoil';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Button, IconButton, Typography } from '@mui/material';

export const VersionIndication = () => {
  const [theme, setTheme ] = useRecoilState(themeState);
  const [paletteMode, setpaletteMode ] = useRecoilState(paletteModeState);
  const toglePaletteMode = () => {
    if (paletteMode === 'dark') {
      setpaletteMode('light');
      setTheme(lightTheme);
    } else {
      setpaletteMode('dark');
      setTheme(darkTheme);
    }
  }

  return (<Box
    component="main"
    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
  >
    
    <IconButton onClick={toglePaletteMode}>
      {paletteMode === "dark" ? <LightModeIcon/>: <DarkModeIcon/>}
    </IconButton>
    <Typography variant='h1'>このアプリについて</Typography>
    <Typography>
      Version: 0.0.3<br/>
      Auther: Daichi Aoki<br/>
      このアプリケーションで発生したいかなる損害にも製作者は責任を負いません。<br/>
      このアプリケーションは開発中です。<br/>
    </Typography>
  </Box>)
}