import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useGameState } from '../../../context/GameContext';

function Heart() {
  const { health } = useGameState();

  const hearts = [...Array(3)].map((_, index) => {
    const key = `heart-${index}`;
    return (
      <React.Fragment key={key}>
        {index < health ? (
          <FavoriteIcon color="error" />
        ) : (
          <FavoriteBorderIcon color="error" />
        )}
      </React.Fragment>
    );
  });

  return <> {hearts}</>;
}

export default Heart;
