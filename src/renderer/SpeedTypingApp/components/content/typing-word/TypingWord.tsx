import React, { useState, useEffect, useRef } from 'react';
import { TextField } from '@mui/material';
import { useGameState, useGameDispatch } from '../../../context/GameContext';

function getCommonPrefixWithDifference(str1: string, str2: string) {
  let result = '';

  for (let i = 0; i < str2.length; i += 1) {
    if (str1[i] !== str2[i]) {
      result += str2[i];
      break;
    }
    result += str2[i];
  }

  return result;
}

function TypingWord() {
  const { typingWord, currentWord } = useGameState();
  const dispatch = useGameDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.toUpperCase();

    if (currentWord.startsWith(newValue) || newValue === '') {
      dispatch({ type: 'SET_TYPING_WORD', payload: newValue });
      setError(null);
    } else {
      setError(newValue);

      const diff = getCommonPrefixWithDifference(currentWord, newValue);

      dispatch({
        type: 'SET_TYPING_WORD',
        payload: diff,
      });
    }
  };

  return (
    <TextField
      inputRef={inputRef}
      value={typingWord}
      onChange={handleTyping}
      variant="outlined"
      size="small"
      error={!!error}
    />
  );
}

export default TypingWord;
