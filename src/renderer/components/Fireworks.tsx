import { useRef, useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import FireworksCanvas from 'react-canvas-confetti/dist/presets/fireworks';
import { TConductorInstance } from 'react-canvas-confetti/dist/types';
import { TCanvasConfettiInstance } from 'react-canvas-confetti/src/types/normalization';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';

interface FireworksProps {
  onComplete: () => void; // Définir le callback
}

function Fireworks({ onComplete }: FireworksProps) {
  const controller = useRef<TConductorInstance>();
  const [run, setRun] = useState<boolean>(false);

  const onInitHandler = (params: {
    confetti: TCanvasConfettiInstance;
    conductor: TConductorInstance;
  }): void => {
    controller.current = params.conductor;
    setRun(true);
  };

  useEffect(() => {
    if (run) {
      controller.current?.run({ speed: 3 });

      setTimeout(() => {
        controller.current?.stop();
        if (onComplete) {
          onComplete();
        }
        setRun(false);
      }, 5000);
    }
  }, [run, onComplete]);

  return (
    <>
      <FireworksCanvas onInit={onInitHandler} />
      <Grid container sx={{ height: 'calc(100vh - 64px)' }}>
        <Grid size={12} alignContent="center">
          <Fade in>
            <Typography variant="h1" component="h2" align="center">
              You Win!
            </Typography>
          </Fade>
        </Grid>
      </Grid>
    </>
  );
}

export default Fireworks;
