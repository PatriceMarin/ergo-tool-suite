import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useGameState } from '../../../context/GameContext';
import './Heart.css';

function Heart() {
  const { health } = useGameState();

  return (
    <>
      {[...Array(3)].map((_, index) => (
        <React.Fragment key={index}>
          {index < health ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </React.Fragment>
      ))}
    </>
  );
}

export default Heart;
