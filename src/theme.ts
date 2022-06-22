import { ThemeOptions } from "@mui/material/styles";

export type UiTheme = {
  drawer: string
}


export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      light: '#5c5fff',
      main: '#5865f2',
      dark: '#4752c4',
      contrastText: '#fefefe',
    },
    secondary: {
      light: '#59ff8e',
      main: '#42be6a',
      dark: '#359855'
    },
    error: {
      light: '#fe4648',
      main: '#d83c3e',
      dark: '#a42d2f',
    },
    text: {
      primary: '#060607',
      secondary: '#4f5660',
    },
    background: {
      default: '#f2f3f5',
    }
  },
  typography: {
    fontFamily: 'Noto Sans JP',
    h1: { fontSize: 50 },
    h2: { fontSize: 46 },
    h3: { fontSize: 42 },
    h4: { fontSize: 36 },
    h5: { fontSize: 20 },
    h6: { fontSize: 18 },
  },
};
export const lightTheme: UiTheme = {
  drawer: '#e3e5e8',
} as const;

export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      light: '#5c5fff',
      main: '#5865f2',
      dark: '#4752c4',
      contrastText: '#fefefe',
    },
    secondary: {
      light: '#59ff8e',
      main: '#42be6a',
      dark: '#359855'
    },
    error: {
      light: '#fe4648',
      main: '#d83c3e',
      dark: '#a42d2f',
    },
    text: {
      primary: '#fefefe',
      secondary: '#b9bbbe'
    },
    background: {
      default: '#36393f',
    },
  },
  typography: {
    fontFamily: 'Noto Sans JP',
    h1: { fontSize: 50 },
    h2: { fontSize: 46 },
    h3: { fontSize: 42 },
    h4: { fontSize: 36 },
    h5: { fontSize: 20 },
    h6: { fontSize: 18 },
  },
};
export const darkTheme: UiTheme = {
  drawer: '#2f3136'
} as const;