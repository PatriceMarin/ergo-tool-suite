import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { useGameDispatch, GameState } from '../../context/GameContext';
import { getWords } from '../../../utils/words'; // Assurez-vous que ces utilitaires existent
import MyBreadcrumbs from '../../../components/MyBreadcrumbs';

function LevelScreen() {
  const [currentLevel, setCurrentLevel] = useState<string>('');
  const dispatch = useGameDispatch();

  const handleLevelChanged = (selectedLevel: string) => {
    setCurrentLevel(selectedLevel);
  };

  const handleSetLevel = () => {
    let words: string[] = [];

    switch (currentLevel) {
      case 'easy':
        words = getWords(10, 5, 6);
        break;
      case 'medium':
        words = getWords(25, 5, 7);
        break;
      case 'hard':
        words = getWords(50, 5, 8);
        break;
      case 'expert':
        words = getWords(75, 5, 9);
        break;
      default:
        // Par défaut, vous pouvez gérer un cas où le niveau ne correspond à aucun des cas définis
        break;
    }

    const game: GameState = {
      level: currentLevel,
      words,
      currentWord: words[0],
      typingWord: '',
      matchedWord: '',
      score: 0,
      health: 3,
      currentState: 'game',
      speed: 0.75,
      typingError: null,
    };

    dispatch({ type: 'SET_GAME', payload: game });
  };

  return (
    <Grid container>
      <Grid size={12}>
        <MyBreadcrumbs title="Ma vitesse de frappe" />
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="select-level">Niveau</InputLabel>
              <Select
                labelId="select-level"
                id="level-select"
                value={currentLevel}
                onChange={(e: SelectChangeEvent<string>): void =>
                  handleLevelChanged(e.target.value)
                }
                label="Niveau"
                variant="outlined"
              >
                <MenuItem value="easy">Débutant</MenuItem>
                <MenuItem value="medium">Intermédiaire</MenuItem>
                <MenuItem value="hard">Expert</MenuItem>
                <MenuItem value="expert">Ultime</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Button
                variant="contained"
                size="large"
                endIcon={<PlayArrowIcon />}
                disabled={!currentLevel}
                onClick={handleSetLevel}
              >
                Démarrer
              </Button>
            </FormControl>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LevelScreen;
