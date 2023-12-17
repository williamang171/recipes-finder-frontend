import { useMemo, useEffect, createContext, useState } from 'react';

import { grey, blue, blueGrey, deepOrange } from '@mui/material/colors';
import { ThemeProvider, createTheme, alpha } from '@mui/material/styles';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

let preferDarkMode = false;
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  preferDarkMode = true;
}
const defaultMode = preferDarkMode ? 'dark' : 'light';

interface Props {
  children: React.ReactNode;
}

export const getDesignTokens = (mode: 'light' | 'dark') => ({
  palette: {
    primary: {
      main: '#439A97'
    },
    secondary: {
      main: '#D127E0'
    },
    divider: mode === 'dark' ? alpha(blue[100], 0.08) : grey[100],
    primaryDark: blueGrey,
    mode,
    ...(mode === 'dark' && {
      background: {
        default: blueGrey[900],
        paper: blueGrey[900]
      }
    })
  }
});

export default function ToggleColorMode(props: Props) {
  const [mode, setMode] = useState<'light' | 'dark'>(defaultMode);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      }
    }),
    []
  );

  useEffect(() => {
    const colorMode = localStorage.getItem('colorMode') || defaultMode;
    if (colorMode === 'dark' || colorMode === 'light') {
      setMode(colorMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('colorMode', mode);
  }, [mode]);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
