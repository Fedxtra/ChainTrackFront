import { getLocalStorage, setLocalStorage } from './localStorage';
import { createContext } from 'react';

export type Theme = 'dark' | 'light' | null;

export const ToggleThemeContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleColorMode: () => {},
});

export const getThemePreference = (): Theme => {
  if (typeof window === 'undefined') {
    return null;
  }

  let darkModeSystem;
  if (typeof window !== 'undefined') {
    darkModeSystem = window?.matchMedia('(prefers-color-scheme: dark)')
      ?.matches;
  }

  const localStoragePreference = getLocalStorage('theme');
  const systemPreference = darkModeSystem ? 'dark' : 'light';
  const preference = localStoragePreference ?? systemPreference;

  if (!localStoragePreference) {
    setLocalStorage('theme', systemPreference);
  }

  return preference as Theme;
};
