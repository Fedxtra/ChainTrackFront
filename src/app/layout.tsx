'use client';

import React, { useMemo, useState } from 'react';
import { Inter } from 'next/font/google';
import MainAppBar from '@/components/Appbar';
import './global.css';
import ErrorHandler from '@/components/ErrorHandler';
import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { getThemePreference, Theme, ToggleThemeContext } from '@/helper/theme';
import { setLocalStorage } from '@/helper/localStorage';
import { blueGrey, brown, grey } from '@mui/material/colors';
import { initialAppContext, AppContext } from '@/helper/store';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [appContext, setAppContext] = useState(initialAppContext);
  const [mode, setMode] = useState<Theme>(getThemePreference());
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newTheme = prevMode === 'light' ? 'dark' : 'light';
          setLocalStorage('theme', newTheme);
          return newTheme;
        });
      },
    }),
    [],
  );

  let theme;

  if (mode) {
    theme = createTheme({
      palette: {
        mode,
        primary: mode === 'dark' ? blueGrey : brown,
        secondary: mode === 'dark' ? grey : blueGrey,
      },
    });
  }

  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ margin: 0, overflow: 'hidden' }}
      >
        <ToggleThemeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme as any}>
            <CssBaseline />
            <AppContext.Provider
              value={{
                appContext,
                setAppContext,
              }}
            >
              <ErrorHandler>
                <>
                  <MainAppBar />
                  <Box margin="2.4rem">{children}</Box>
                </>
              </ErrorHandler>
            </AppContext.Provider>
          </ThemeProvider>
        </ToggleThemeContext.Provider>
      </body>
    </html>
  );
}
