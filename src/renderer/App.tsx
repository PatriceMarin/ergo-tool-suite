import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import MyKeyboardApp from './MyKeyboardApp';
import TypingApp from './TypingApp';
// import VirtualKeyboard from './VirtualKeyboard';
import ResponsiveAppBar from './ResponsiveAppBar';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';

// Define a custom theme
let theme = createTheme({
  palette: {
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
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

theme = createTheme(theme, {
  palette: {
    flushyYellow: {
      main: '#E3D026',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#FFFFFF',
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container maxWidth={false} disableGutters>
          <ResponsiveAppBar />
          <Routes>
            <Route path="/typing" element={<TypingApp />} />
            <Route path="/keyboard" element={<MyKeyboardApp />} />
            {/* <Route path="/help" element={<VirtualKeyboard />} /> */}
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}
