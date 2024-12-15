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

import { useGameDispatch } from '../../context/GameContext';
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

    dispatch({ type: 'SET_LEVEL', payload: currentLevel });
    dispatch({ type: 'SET_WORDS', payload: words });
    dispatch({ type: 'SET_CURRENT_STATE', payload: 'game' });
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
    // <div className="level-screen">
    //   <div className="level-content">
    //     <div className="level-title">SELECT LEVEL</div>
    //     <div className="level-buttons">
    //       <Button
    //         className={`level-button ${level === 'easy' ? 'active' : ''}`}
    //         onClick={() => handleSetLevel('easy')}
    //       >
    //         Easy
    //       </Button>
    //       <Button
    //         className={`level-button ${level === 'medium' ? 'active' : ''}`}
    //         onClick={() => handleSetLevel('medium')}
    //       >
    //         Medium
    //       </Button>
    //       <Button
    //         className={`level-button ${level === 'hard' ? 'active' : ''}`}
    //         onClick={() => handleSetLevel('hard')}
    //       >
    //         Hard
    //       </Button>
    //       <Button
    //         className={`level-button ${level === 'expert' ? 'active' : ''}`}
    //         onClick={() => handleSetLevel('expert')}
    //       >
    //         Expert
    //       </Button>
    //     </div>
    //   </div>
    // </div>
  );
}

export default LevelScreen;
