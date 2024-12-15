import React from 'react';
import Grid from '@mui/material/Grid2';
import { Stack, Typography } from '@mui/material';
import Fade from '@mui/material/Fade';
import Restart from '../content/restart/Restart';
import MyBreadcrumbs from '../../../components/MyBreadcrumbs';

function GameOverScreen() {
  return (
    <Grid
      container
      sx={{ height: 'calc(100vh - 64px)' }}
      justifyContent="center"
    >
      <Grid size={12}>
        <MyBreadcrumbs title="Ma vitesse de frappe" />
      </Grid>
      <Grid p={2} spacing={2}>
        <Stack spacing={2} direction="column">
          <Fade in>
            <Typography variant="h1" component="h2" align="center">
              Game Over
            </Typography>
          </Fade>
          <Restart />
        </Stack>
      </Grid>
    </Grid>
  );
}

export default GameOverScreen;
