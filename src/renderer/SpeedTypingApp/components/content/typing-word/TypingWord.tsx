import React, { useState, useEffect, useRef } from 'react';
import { TextField } from '@mui/material';
import { useGameState, useGameDispatch } from '../../../context/GameContext';

function TypingWord() {
  const { typingWord, typingError } = useGameState();
  const dispatch = useGameDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<boolean | null>(typingError);

  useEffect(() => {
    setError(typingError);
  }, [typingError]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.toLocaleUpperCase('fr-FR');
    dispatch({ type: 'SET_TYPING_WORD', payload: newValue });
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
