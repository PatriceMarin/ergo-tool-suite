import React from 'react';
import { useColorScheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

function ThemeChanger() {
  const { mode, setMode } = useColorScheme();

  return (
    <div className="flex items-center order-last ml-4 mr-4">
      {mode === 'dark' ? (
        <Button onClick={() => setMode('light')}>
          <DarkModeIcon />
        </Button>
      ) : (
        <Button color="inherit" onClick={() => setMode('dark')}>
          <LightModeIcon />
        </Button>
      )}
    </div>
  );
}

export default ThemeChanger;
