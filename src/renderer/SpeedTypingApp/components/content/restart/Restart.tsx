import React from 'react';
import { Button } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { useGameDispatch, initialState } from '../../../context/GameContext';
import './Restart.css';

function Restart() {
  const dispatch = useGameDispatch();

  return (
    <Button
      variant="contained"
      endIcon={<ReplayIcon />}
      onClick={() => {
        dispatch({ type: 'SET_RESTART', payload: initialState });
      }}
    >
      Recommencer
    </Button>
  );
}

export default Restart;
