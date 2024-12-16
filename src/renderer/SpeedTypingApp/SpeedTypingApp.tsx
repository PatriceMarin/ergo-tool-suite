import Grid from '@mui/material/Grid2';
import { Stack } from '@mui/material';
import {
  GameProvider,
  useGameState,
  useGameDispatch,
  initialState,
} from './context/GameContext';
import GameScreen from './components/game-screen/GameScreen';
import LevelScreen from './components/level-screen/LevelScreen';
import GameOverScreen from './components/game-over-screen/GameOverScreen';
import Fireworks from '../components/Fireworks';
import MyBreadcrumbs from '../components/MyBreadcrumbs';

function AppContent() {
  const { currentState, health } = useGameState();
  const dispatch = useGameDispatch();

  const handleFireworksComplete = () => {
    dispatch({ type: 'SET_RESTART', payload: initialState });
  };

  return (
    <Grid size={12} alignItems="stretch">
      {currentState === 'level' && health > 0 && <LevelScreen />}
      {currentState === 'game' && health > 0 && <GameScreen />}
      {currentState === 'game-over' && <GameOverScreen />}
      {currentState === 'you-win' && (
        <Stack>
          <MyBreadcrumbs title="Ma vitesse de frappe" />
          <Fireworks onComplete={handleFireworksComplete} />
        </Stack>
      )}
    </Grid>
  );
}

function SpeedTypingApp() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

export default SpeedTypingApp;
