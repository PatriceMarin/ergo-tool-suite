import React, { useMemo, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useGameState } from '../../../context/GameContext';
import './ScrollingWord.css';

interface ScrollingWordProps {
  word: string;
  topPosition: number;
  onMissed: () => void;
  onMatched: () => void;
}

function ScrollingWord({
  word,
  topPosition,
  onMissed,
  onMatched,
}: ScrollingWordProps) {
  const { currentWord, typingWord, typingError } = useGameState();
  const theme = useTheme();

  useEffect(() => {
    if (topPosition > 90) {
      onMissed();
    }
  }, [topPosition, onMissed]);

  useEffect(() => {
    if (typingWord === word) {
      onMatched();
    }
  }, [typingWord, word, onMatched]);

  const coloredLetters = useMemo(() => {
    return word.split('').map((letter, i) => {
      if (currentWord && currentWord !== word) {
        return {
          letter,
          color: theme.palette.text.primary,
          matched: null,
          key: `${letter}-${i}`,
        };
      }

      const typedLetter = typingWord ? typingWord[i] : undefined;
      const matched = typingError;

      if (typedLetter === undefined) {
        return {
          letter,
          color: theme.palette.text.primary,
          matched,
          key: `${letter}-${i}`,
        };
      }
      if (typedLetter !== letter) {
        return {
          letter,
          color: theme.palette.error.main,
          matched: false,
          key: `${letter}-${i}`,
        };
      }
      if (typedLetter === letter) {
        return {
          letter,
          color: theme.palette.success.main,
          matched,
          key: `${letter}-${i}`,
        };
      }
      if (typedLetter === letter && typingWord === word) {
        return {
          letter,
          color: theme.palette.success.main,
          matched,
          key: `${letter}-${i}`,
        };
      }
      return {
        letter,
        color: theme.palette.text.primary,
        matched,
        key: `${letter}-${i}`,
      };
    });
  }, [
    word,
    currentWord,
    typingWord,
    typingError,
    theme.palette.text.primary,
    theme.palette.error.main,
    theme.palette.success.main,
  ]);

  const hasError = coloredLetters.some((x) => !!x.matched);

  return (
    <div
      className="word-box"
      style={{
        color: theme.palette.text.primary,
        background: theme.palette.background.paper,
        top: topPosition < 92 ? `${topPosition}%` : '92%',
        border: '2px solid',
        borderColor: hasError
          ? theme.palette.error.main
          : theme.palette.info.main,
      }}
    >
      {coloredLetters.map((coloredLetter) => {
        return (
          <div className="letter-box" key={coloredLetter.key}>
            <div className="letter" style={{ color: coloredLetter.color }}>
              {coloredLetter.letter}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ScrollingWord;
