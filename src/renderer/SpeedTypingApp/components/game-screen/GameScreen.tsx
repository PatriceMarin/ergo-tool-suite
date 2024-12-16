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

    const distance = index * 25;
    const topPosition = distance;

    return {
      word,
      topPosition: (-containerHeight * topPosition) / 50,
      leftPosition,
    };
  });
}

function GameScreen() {
  const context = useGameState();
  const dispatch = useGameDispatch();
  const containerHeight = 50;

  const [wordPositions, setWordPositions] = useState<WordPosition[]>(() =>
    calculatePositions(context.words, containerHeight),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setWordPositions((prevPositions) =>
        prevPositions.map(({ word, topPosition, leftPosition }) => {
          return {
            word,
            topPosition: topPosition + context.speed,
            leftPosition, // Keep left position unchanged
          };
        }),
      );
    }, 100);

    return () => clearInterval(interval);
  }, [context.speed]);

  const handleMissedWord = useCallback(
    (word: string) => {
      setWordPositions((prevPositions) =>
        prevPositions.filter((pos) => pos.word !== word),
      );

      dispatch({
        type: 'SET_TYPED_WORD',
        payload: {
          ...context,
          words: context.words.filter((w) => w !== word),
          currentWord: context.words.filter((w) => w !== word)[0],
          health: context.health - 1,
          typingWord: '',
        },
      });
    },
    [dispatch, context],
  );

  const handleMatchedWord = useCallback(
    (word: string) => {
      setWordPositions((prevPositions) =>
        prevPositions.filter((pos) => pos.word !== word),
      );

      dispatch({
        type: 'SET_TYPED_WORD',
        payload: {
          ...context,
          words: context.words.filter((w) => w !== word),
          currentWord: context.words.filter((w) => w !== word)[0],
          typingWord: '',
        },
      });

      switch (context.level) {
        case 'easy':
          dispatch({
            type: 'SET_SPEED',
            payload: context.speed * 1.03,
          });
          break;
        case 'medium':
          dispatch({
            type: 'SET_SPEED',
            payload: context.speed * 1.04,
          });
          break;
        case 'hard':
          dispatch({
            type: 'SET_SPEED',
            payload: context.speed * 1.05,
          });
          break;
        case 'expert':
          dispatch({
            type: 'SET_SPEED',
            payload: context.speed * 1.06,
          });
          break;
        default:
          break;
      }
    },
    [dispatch, context],
  );

  return (
    <Grid container alignItems="stretch" sx={{ height: 'calc(100vh - 64px)' }}>
      <Grid size={12}>
        {wordPositions.map(({ word, topPosition }) => (
          <ScrollingWord
            key={word}
            word={word}
            topPosition={topPosition}
            onMissed={() => handleMissedWord(word)}
            onMatched={() => handleMatchedWord(word)}
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
