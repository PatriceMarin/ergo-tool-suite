import React, { useEffect, useState, useCallback } from 'react';
import Grid from '@mui/material/Grid2';
import Bottom from '../content/bottom/Bottom';
import ScrollingWord from '../content/scrolling-word/ScrollingWord';
import { useGameState, useGameDispatch } from '../../context/GameContext';

interface WordPosition {
  word: string;
  topPosition: number;
  leftPosition: number;
}

function calculatePositions(
  words: string[],
  containerHeight: number,
): WordPosition[] {
  const paddingLeft = 10;
  const paddingRight = 90;

  return words.map((word, index) => {
    const leftPosition =
      Math.random() * (paddingRight - paddingLeft) + paddingLeft;

    const distance = (index * 150) / words.length;
    const topPosition = distance + Math.random() * (100 / words.length);

    return {
      word,
      topPosition: (-containerHeight * topPosition) / 100,
      leftPosition,
    };
  });
}

function GameScreen() {
  const { words, health, speed, level } = useGameState();
  const dispatch = useGameDispatch();
  const containerHeight = 500;

  const [wordPositions, setWordPositions] = useState<WordPosition[]>(() =>
    calculatePositions(words, containerHeight),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setWordPositions((prevPositions) =>
        prevPositions.map(({ word, topPosition, leftPosition }) => {
          return {
            word,
            topPosition: topPosition + speed,
            leftPosition, // Keep left position unchanged
          };
        }),
      );
    }, 100);

    return () => clearInterval(interval);
  }, [speed]);

  const handleWordMissed = useCallback(
    (word: string) => {
      setWordPositions((prevPositions) =>
        prevPositions.filter((pos) => pos.word !== word),
      );

      dispatch({
        type: 'SET_WORDS',
        payload: words.filter((w) => w !== word),
      });

      dispatch({
        type: 'SET_CURRENT_WORD',
        payload: words.filter((w) => w !== word)[0],
      });

      dispatch({
        type: 'SET_HEALTH',
        payload: health - 1,
      });

      dispatch({
        type: 'SET_TYPING_WORD',
        payload: '',
      });
    },
    [words, dispatch, health],
  );

  const handleWordMatched = useCallback(
    (word: string) => {
      setWordPositions((prevPositions) =>
        prevPositions.filter((pos) => pos.word !== word),
      );

      dispatch({
        type: 'SET_WORDS',
        payload: words.filter((w) => w !== word),
      });

      dispatch({
        type: 'SET_TYPING_WORD',
        payload: '',
      });

      dispatch({
        type: 'SET_CURRENT_WORD',
        payload: words.filter((w) => w !== word)[0],
      });

      switch (level) {
        case 'easy':
          dispatch({
            type: 'SET_SPEED',
            payload: speed * 1.03,
          });
          break;
        case 'medium':
          dispatch({
            type: 'SET_SPEED',
            payload: speed * 1.04,
          });
          break;
        case 'hard':
          dispatch({
            type: 'SET_SPEED',
            payload: speed * 1.05,
          });
          break;
        case 'expert':
          dispatch({
            type: 'SET_SPEED',
            payload: speed * 1.06,
          });
          break;
        default:
          // Par défaut, vous pouvez gérer un cas où le niveau ne correspond à aucun des cas définis
          break;
      }
    },
    [dispatch, words, speed, level],
  );

  return (
    <Grid container alignItems="stretch" sx={{ height: 'calc(100vh - 64px)' }}>
      <Grid size={12}>
        {wordPositions.map(({ word, topPosition }) => (
          <ScrollingWord
            key={word}
            word={word}
            topPosition={topPosition}
            onMissed={() => handleWordMissed(word)}
            onMatched={() => handleWordMatched(word)}
          />
        ))}
      </Grid>
      <Grid
        container
        size={12}
        justifyContent="center"
        alignItems="center"
        alignContent="flex-end"
        p={2}
        spacing={2}
      >
        <Bottom />
      </Grid>
    </Grid>
  );
}

export default GameScreen;
