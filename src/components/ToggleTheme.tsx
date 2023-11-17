import React, { useContext, useState } from 'react';
import { Box, PaletteMode, Switch, useTheme, styled } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { ToggleThemeContext } from '@/helper/theme';

const MaterialUISwitch = styled(Switch)(() => ({
  width: 62,
  height: 40,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    marginTop: -1,
    marginBottom: 3,
    marginLeft: -4,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& + .MuiSwitch-track': {
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    borderRadius: 16,
  },
}));

export const ToggleTheme = () => {
  const theme = useTheme();
  const toggleTheme = useContext(ToggleThemeContext);
  const [themeMode, setThemeMode] = useState<PaletteMode>(theme?.palette?.mode);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: boolean,
  ) => {
    toggleTheme.toggleColorMode();
    setThemeMode(value ? 'dark' : 'light');
  };

  return (
    <Box>
      <MaterialUISwitch
        icon={<DarkModeIcon />}
        checkedIcon={<LightModeIcon />}
        checked={themeMode === 'dark'}
        onChange={handleChange}
        color="warning"
      />
    </Box>
  );
};
