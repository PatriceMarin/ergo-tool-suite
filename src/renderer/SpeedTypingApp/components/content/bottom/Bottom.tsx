import React from 'react';
import Heart from '../heart/Heart';
import TypingWord from '../typing-word/TypingWord';
import Restart from '../restart/Restart';
import './Bottom.css';

function Bottom() {
  return (
    <>
      <Heart />
      <TypingWord />
      <Restart />
    </>
  );
}

export default Bottom;
