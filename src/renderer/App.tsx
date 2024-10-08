import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import TypingApp from './TypingApp';
import ResponsiveAppBar from './ResponsiveAppBar';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

// Define a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#dc004e', // Red
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

function KeyboardApp() {
  return <Typography variant="h4">Ton clavier</Typography>;
}

function Help() {
  return <Typography variant="h4">Page d'aide</Typography>;
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container maxWidth={false} disableGutters>
          <ResponsiveAppBar />
          <Routes>
            <Route path="/typing" element={<TypingApp />} />
            <Route path="/keyboard" element={<KeyboardApp />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}
