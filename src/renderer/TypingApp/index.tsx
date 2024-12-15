import React, { useState, useEffect, useCallback } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
  Alert,
  AlertTitle,
  Button,
  FormControl,
  Paper,
  Stack,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import currentTime from '../utils/time'; // Assurez-vous que ces utilitaires existent
import { getWordsSeparatedBySpace } from '../utils/words'; // Assurez-vous que ces utilitaires existent
import useKeyPress from '../hooks/useKeyPress'; // Assurez-vous que ce hook existe
import MyBreadcrumbs from '../components/MyBreadcrumbs';

const initialWords = getWordsSeparatedBySpace();

function Typing() {
  const [leftPadding, setLeftPadding] = useState(
    new Array(20).fill(' ').join(''),
  );
  const [outgoingChars, setOutgoingChars] = useState('');
  const [currentChar, setCurrentChar] = useState(initialWords.charAt(0));
  const [incomingChars, setIncomingChars] = useState(initialWords.substr(1));
  const [wrongChar, setWrongChar] = useState<boolean>(false);

  const [startTime, setStartTime] = useState<number | undefined>(undefined);
  const [wordCount, setWordCount] = useState(0);
  const [accuracy, setAccuracy] = useState('');
  const [typedChars, setTypedChars] = useState('');
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);

  const startGame = useCallback(() => {
    setLeftPadding(new Array(20).fill(' ').join(''));
    setOutgoingChars('');
    setCurrentChar(initialWords.charAt(0));
    setIncomingChars(initialWords.substr(1));

    setStartTime(undefined);
    setWordCount(0);
    setAccuracy('');
    setTypedChars('');
    setMinutes(1); // Temps défini pour le jeu
    setSeconds(0); // Temps défini pour le jeu
    setIsGameActive(true);
  }, []);

  const handleKeyPress = useCallback(
    (key: string) => {
      if (!isGameActive) return;

      let updatedOutgoingChars = outgoingChars;
      let updatedIncomingChars = incomingChars;

      if (!startTime) {
        setStartTime(currentTime());
      }

      if (key === currentChar) {
        if (leftPadding.length > 0) {
          setLeftPadding(leftPadding.substring(1));
        }

        updatedOutgoingChars += currentChar;
        setOutgoingChars(updatedOutgoingChars);
        setCurrentChar(incomingChars.charAt(0));
        setWrongChar(false);

        updatedIncomingChars = incomingChars.substring(1);

        if (updatedIncomingChars.split(' ').length < 10) {
          updatedIncomingChars += ` ${getWordsSeparatedBySpace()}`;
        }
        setIncomingChars(updatedIncomingChars);

        if (incomingChars.charAt(0) === ' ') {
          setWordCount((prevCount) => prevCount + 1);
        }
      } else {
        setWrongChar(true);
      }

      const updatedTypedChars = typedChars + key;
      setTypedChars(updatedTypedChars);
      setAccuracy(
        (
          (updatedOutgoingChars.length * 100) /
          updatedTypedChars.length
        ).toFixed(2),
      );
    },
    [
      incomingChars,
      outgoingChars,
      currentChar,
      isGameActive,
      startTime,
      typedChars,
      leftPadding,
    ],
  );

  useKeyPress(handleKeyPress);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isGameActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else {
          clearInterval(interval);
          setIsGameActive(false);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isGameActive, seconds, minutes]);

  return (
    <Grid container>
      <Grid size={12}>
        <MyBreadcrumbs title="Aide à la frappe" />
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            alignItems="baseline"
            justifyContent="space-between"
            spacing={2}
          >
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Button
                variant="contained"
                size="large"
                endIcon={<PlayArrowIcon />}
                disabled={isGameActive}
                onClick={startGame}
              >
                Démarrer
              </Button>
            </FormControl>

            {isGameActive && (
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <TextField
                  label="Temps restant"
                  variant="outlined"
                  value={`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
                  sx={{ marginBottom: 2 }}
                />
              </FormControl>
            )}
          </Stack>
        </Box>
      </Grid>

      <Grid size={12} p={2}>
        {isGameActive && (
          <Paper elevation={3} sx={{ p: 6 }}>
            <Typography variant="h4">
              <Box component="span" sx={{ color: 'secondary.main' }}>
                {(leftPadding + outgoingChars).slice(-30)}
              </Box>
              <Box
                component="span"
                sx={{
                  backgroundColor: wrongChar ? 'error.main' : 'success.main',
                }}
              >
                {currentChar}
              </Box>
              <Box component="span">{incomingChars.substr(0, 30)}</Box>
            </Typography>
          </Paper>
        )}

        {!isGameActive && minutes === 0 && seconds === 0 && (
          <Alert severity="info">
            <AlertTitle>
              <Typography variant="h4" fontWeight="bold">
                Time's Up!
              </Typography>
            </AlertTitle>
            <Typography variant="h6">Nombre de mots : {wordCount}</Typography>
            <Typography variant="h6">Précision : {accuracy}%</Typography>
          </Alert>
        )}
      </Grid>
    </Grid>
  );
}

export default Typing;
