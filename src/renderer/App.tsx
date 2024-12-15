import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { HashRouter, Route, Routes } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import MyKeyboardApp from './MyKeyboardApp';
import TypingApp from './TypingApp';
import SpeedTypingApp from './SpeedTypingApp/SpeedTypingApp';

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        primary: {
          main: '#8cb5cb',
        },
        secondary: {
          main: '#c9dfec',
          contrastText: 'rgba(255,255,255,0.87)',
        },
        background: {
          default: '#FFFFFF',
          paper: '#8cb5cb',
        },
        text: {
          primary: 'rgba(0,0,0,0.87)',
          secondary: 'rgba(0,0,0,0.6)',
          disabled: 'rgba(183,183,183,0.38)',
        },
        success: {
          main: '#2e7d32',
          light: '#4caf50',
          dark: '#1b5e20',
          contrastText: '#fff',
        },
        error: {
          main: '#d32f2f',
          light: '#ef5350',
          dark: '#c62828',
          contrastText: '#fff',
        },
        customWhite: {
          main: '#000000',
          light: '#FFFFFF', // Code couleur pour 'custom'
          contrastText: '#000000', // Couleur du texte contrastant pour 'custom'
        },
        customBlack: {
          main: '#FFFFFF',
          light: '#000000', // Code couleur pour 'custom'
          contrastText: '#000000', // Couleur du texte contrastant pour 'custom'
        },
        flushyYellow: {
          main: '#E3D026',
          light: '#E9DB5D',
          dark: '#A29415',
          contrastText: '#FFFFFF',
        },
      },
    },
    dark: {
      palette: {
        mode: 'dark',
        primary: {
          main: '#5893df',
        },
        secondary: {
          main: '#2ec5d3',
        },
        background: {
          default: '#192231',
          paper: '#192231',
        },
      },
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<AdminLayout />}>
            <Route path="/myKeyboardApp" element={<MyKeyboardApp />} />
            <Route path="/typingApp" element={<TypingApp />} />
            <Route path="/speedTypingApp" element={<SpeedTypingApp />} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}
