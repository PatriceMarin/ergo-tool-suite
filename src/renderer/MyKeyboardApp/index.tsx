import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import {
  Box,
  Paper,
  Snackbar,
  SnackbarCloseReason,
  SnackbarContent,
  Typography,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';
import { TConductorInstance } from 'react-canvas-confetti/dist/types';
import ControlBar from './ControlBar';
import HiddenKeys from './HiddenKeys';
import Key from './Key';
import keysData from './frenchKeyboardConfig.json';
import './index.css';
import { IKey, IKeyMatch } from './Types';
import { TCanvasConfettiInstance } from 'react-canvas-confetti/src/types/normalization';

function MyKeyboard() {
  const [level, setLevel] = useState<string>('');
  const [withColors, setWithColors] = useState<boolean>(false);
  const [hiddenKeys, setHiddenKeys] = useState<IKey[]>([]);
  const [revealedKeys, setRevealedKeys] = useState<IKey[]>([]);
  const keys: IKey[] = keysData as IKey[];
  const [keyboardDisabled, setKeyboardDisabled] = useState<boolean>(true);
  const [selectedKeyMatch, setSelectedKeyMatch] = useState<IKeyMatch>({
    selectedKey: null,
    selectedKeyboardKey: null,
    matched: null,
  });

  const controller = React.useRef<TConductorInstance>();

  const shuffleArray = (array: any[]) => array.sort(() => Math.random() - 0.5);

  const handleLevelChange = (event: SelectChangeEvent) =>
    setLevel(event.target.value);

  const handleWithColorsChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setWithColors(event.target.checked);

  const startMyKeyboardSession = () => {
    let selectedKeys: IKey[];

    switch (level) {
      case '1':
        selectedKeys = shuffleArray(
          keys.filter((key) => /^[a-z0-9&é"'(§è!çà)]$/i.test(key.id)),
        ).slice(0, 4);

        setHiddenKeys(selectedKeys);
        break;
      case '2':
        selectedKeys = shuffleArray(
          keys.filter((key) => /^[a-z0-9&é"'(§è!çà)]$/i.test(key.id)),
        ).slice(0, 8);

        setHiddenKeys(selectedKeys);
        break;
      case '3':
        selectedKeys = shuffleArray(
          keys.filter((key) => /^[a-z]$/i.test(key.id)),
        );

        setHiddenKeys(selectedKeys);
        break;
      case '4':
        setHiddenKeys(shuffleArray([...keys]));
        break;
    }

    setKeyboardDisabled(false);
    setRevealedKeys([]);
  };

  const applyKeyMatch = (selectedKeyMatch: IKeyMatch) => {
    if (
      selectedKeyMatch.selectedKeyboardKey === null ||
      selectedKeyMatch.selectedKey === null
    ) {
      return;
    }

    if (
      selectedKeyMatch.selectedKeyboardKey.id ===
      selectedKeyMatch.selectedKey.id
    ) {
      setRevealedKeys([...revealedKeys, selectedKeyMatch.selectedKey]);
      setHiddenKeys(
        hiddenKeys.filter((k) => k !== selectedKeyMatch.selectedKeyboardKey),
      );

      setSelectedKeyMatch({
        selectedKey: null,
        selectedKeyboardKey: null,
        matched: null,
      });
    } else {
      setKeyboardDisabled(true);
      setSelectedKeyMatch({
        ...selectedKeyMatch,
        matched: false,
      });
    }
  };

  useEffect(() => {
    applyKeyMatch(selectedKeyMatch);
    if (hiddenKeys.length === 0 && revealedKeys.length > 0) {
      controller.current?.run({ speed: 3 });

      setTimeout(function () {
        controller.current?.stop();
        setKeyboardDisabled(true);
      }, 5000);
    }
  }, [selectedKeyMatch, hiddenKeys, revealedKeys]);

  const handleHiddenKeyClick = (key: IKey) => {
    setSelectedKeyMatch((prevState) => ({
      ...prevState,
      selectedKey: key,
    }));
  };

  const handleKeyboardClick = (key: IKey) => {
    setSelectedKeyMatch((prevState) => ({
      ...prevState,
      selectedKeyboardKey: key,
    }));
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSelectedKeyMatch({
      selectedKey: null,
      selectedKeyboardKey: null,
      matched: null,
    });
    setKeyboardDisabled(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const onInitHandler = (params: {
    confetti: TCanvasConfettiInstance;
    conductor: TConductorInstance;
  }): void => {
    controller.current = params.conductor;
  };

  return (
    <Box>
      <Fireworks onInit={onInitHandler} />
      <Grid container spacing={2} sx={{ p: 2, backgroundColor: 'white' }}>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={selectedKeyMatch.matched === false}
          action={action}
        >
          <SnackbarContent
            sx={{
              backgroundColor: 'red',
              boxShadow: 2,
              p: 2,
              minWidth: 300,
              minHeight: 75,
            }}
            message="Ce n'est pas la bonne touche. Réessaye !"
            action={action}
          />
        </Snackbar>

        <Grid size={12}>
          <Typography variant="h4" color="black">
            Découvrir mon clavier
          </Typography>
        </Grid>

        <Grid size={12}>
          <Paper
            elevation={3}
            component="section"
            sx={{ p: 2, backgroundColor: 'white' }}
          >
            <ControlBar
              level={level}
              withColors={withColors}
              onLevelChange={handleLevelChange}
              onWithColorsChange={handleWithColorsChange}
              onStart={startMyKeyboardSession}
            />
          </Paper>
        </Grid>

        {hiddenKeys.length > 0 && (
          <Grid size={12}>
            <HiddenKeys
              hiddenKeys={hiddenKeys}
              onRevealKey={handleHiddenKeyClick}
              selectedKey={selectedKeyMatch.selectedKey}
            />
          </Grid>
        )}

        <Grid size={12}>
          <Paper
            elevation={0}
            component="section"
            sx={{
              p: 2,
              backgroundColor: 'white',
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            <Box className="keyboard-base">
              {keys.map((key) => (
                <Key
                  key={`key-${key.id}`}
                  keyData={key}
                  onKeyPress={handleKeyboardClick}
                  hidden={hiddenKeys.includes(key)}
                  withColors={withColors}
                  isSelected={key === selectedKeyMatch.selectedKeyboardKey}
                  isDisabled={keyboardDisabled}
                />
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MyKeyboard;
