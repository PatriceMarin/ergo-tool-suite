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
  const { typingWord, currentWord } = useGameState();
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
      if (currentWord !== word) {
        return { letter, color: theme.palette.text.primary };
      }

      const typedLetter = typingWord ? typingWord[i] : undefined;

      if (typedLetter === undefined) {
        return { letter, color: theme.palette.text.primary };
      }
      if (typedLetter !== letter) {
        return { letter, color: theme.palette.error.main };
      }
      if (typedLetter === letter) {
        return { letter, color: theme.palette.success.main };
      }
      if (typedLetter === letter && typingWord === word) {
        return { letter, color: theme.palette.success.main };
      }
      return { letter, color: theme.palette.text.primary };
    });
  }, [
    word,
    currentWord,
    typingWord,
    theme.palette.text,
    theme.palette.error.main,
    theme.palette.success.main,
  ]);

  return (
    <div
      className="word-box"
      style={{
        color: theme.palette.text.primary,
        background: theme.palette.background.paper,
        top: topPosition < 92 ? `${topPosition}%` : '92%',
      }}
    >
      {coloredLetters.map((coloredLetter, i) => (
        <div className="letter-box" key={i}>
          <div className="letter" style={{ color: coloredLetter.color }}>
            {coloredLetter.letter}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ScrollingWord;
