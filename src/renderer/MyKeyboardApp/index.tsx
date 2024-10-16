import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import {
  Paper,
  Typography,
  TextField,
  Box,
  Switch,
  FormControlLabel,
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import Button, { ButtonPropsColorOverrides } from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Stack from '@mui/material/Stack';
import './index.css';
import { inherits } from 'util';

// Structure pour représenter une touche
interface Key {
  id: string; // Identifiant de la touche
  label: string; // Texte à afficher sur la touche
  gridArea?: string; // Optionnel, pour les touches qui couvrent plusieurs colonnes ou lignes
  rows?: number; // Optionnel, pour les touches qui couvrent plusieurs lignes
  columns?: number; // Optionnel, pour les touches qui couvrent plusieurs colonnes
  color?: keyof ButtonPropsColorOverrides;
}

// Disposition des touches AZERTY avec le pavé numérique
const keys: Key[] = [
  { id: 'escape', label: 'Échap' },
  { id: 'f1', label: 'F1' },
  { id: 'f2', label: 'F2' },
  { id: 'f3', label: 'F3' },
  { id: 'f4', label: 'F4' },
  { id: 'f5', label: 'F5' },
  { id: 'f6', label: 'F6' },
  { id: 'f7', label: 'F7' },
  { id: 'f8', label: 'F8' },
  { id: 'f9', label: 'F9' },
  { id: 'f10', label: 'F10' },
  { id: 'f11', label: 'F11' },
  { id: 'f12', label: 'F12' },
  { id: 'insert', label: 'Insert' },
  { id: 'suppr', label: 'Suppr' },
  { id: 'grave', label: '²' },
  { id: '1', label: '1\n&' },
  { id: '2', label: '2\né' },
  { id: '3', label: '3\n"' },
  { id: '4', label: "4\n'" },
  { id: '5', label: '5\n(' },
  { id: '6', label: '6\n-' },
  { id: '7', label: '7\nè' },
  { id: '8', label: '8\n_' },
  { id: '9', label: '9\nç' },
  { id: '0', label: '0\nà' },
  { id: 'minus', label: '°\n)' },
  { id: 'equals', label: '+\n=' },
  { id: 'backspace', label: '⌫', columns: 4 },
  { id: 'tab', label: 'Tab', columns: 3 },
  { id: 'a', label: 'A', color: 'error' as keyof ButtonPropsColorOverrides },
  { id: 'z', label: 'Z', color: 'warning' as keyof ButtonPropsColorOverrides },
  {
    id: 'e',
    label: 'E',
    color: 'flushyYellow' as keyof ButtonPropsColorOverrides,
  },
  { id: 'r', label: 'R', color: 'success' as keyof ButtonPropsColorOverrides },
  { id: 't', label: 'T', color: 'success' as keyof ButtonPropsColorOverrides },
  { id: 'y', label: 'Y', color: 'info' } as keyof ButtonPropsColorOverrides,
  { id: 'u', label: 'U', color: 'info' as keyof ButtonPropsColorOverrides },
  {
    id: 'i',
    label: 'I',
    color: 'flushyYellow' as keyof ButtonPropsColorOverrides,
  },
  { id: 'o', label: 'O', color: 'warning' as keyof ButtonPropsColorOverrides },
  { id: 'p', label: 'P', color: 'error' as keyof ButtonPropsColorOverrides },
  { id: 'caret', label: '¨\n^' },
  { id: 'dollar', label: '£\n$' },
  { id: 'enter', label: '↵', rows: 2, columns: 3 },
  { id: 'caps-lock', label: '⇪', columns: 3 },
  { id: 'q', label: 'Q', color: 'error' as keyof ButtonPropsColorOverrides },
  { id: 's', label: 'S', color: 'warning' as keyof ButtonPropsColorOverrides },
  {
    id: 'd',
    label: 'D',
    color: 'flushyYellow' as keyof ButtonPropsColorOverrides,
  },
  { id: 'f', label: 'F', color: 'success' as keyof ButtonPropsColorOverrides },
  { id: 'g', label: 'G', color: 'success' as keyof ButtonPropsColorOverrides },
  { id: 'h', label: 'H', color: 'info' as keyof ButtonPropsColorOverrides },
  { id: 'j', label: 'J', color: 'info' as keyof ButtonPropsColorOverrides },
  {
    id: 'k',
    label: 'K',
    color: 'flushyYellow' as keyof ButtonPropsColorOverrides,
  },
  { id: 'l', label: 'L', color: 'warning' as keyof ButtonPropsColorOverrides },
  { id: 'm', label: 'M', color: 'error' as keyof ButtonPropsColorOverrides },
  { id: 'u-grave', label: '%\nù' },
  { id: 'asterisk', label: 'µ\n*' },
  { id: 'shift-left', label: '⇧', columns: 3 },
  { id: 'inferieur', label: '>\n<', columns: 2 },
  { id: 'w', label: 'W', color: 'error' as keyof ButtonPropsColorOverrides },
  { id: 'x', label: 'X', color: 'warning' as keyof ButtonPropsColorOverrides },
  {
    id: 'c',
    label: 'C',
    color: 'flushyYellow' as keyof ButtonPropsColorOverrides,
  },
  { id: 'v', label: 'V', color: 'success' as keyof ButtonPropsColorOverrides },
  { id: 'b', label: 'B', color: 'success' as keyof ButtonPropsColorOverrides },
  { id: 'n', label: 'N', color: 'info' as keyof ButtonPropsColorOverrides },
  {
    id: 'comma',
    label: '?\n,',
    color: 'info' as keyof ButtonPropsColorOverrides,
  },
  {
    id: 'semicolon',
    label: '.\n;',
    color: 'flushyYellow' as keyof ButtonPropsColorOverrides,
  },
  {
    id: 'colon',
    label: '/\n:',
    color: 'warning' as keyof ButtonPropsColorOverrides,
  },
  {
    id: 'exclamation',
    label: '§\n!',
    color: 'error' as keyof ButtonPropsColorOverrides,
  },
  { id: 'shift-right', label: '⇧', columns: 5 },
  { id: 'ctrl-left', label: 'Ctrl', columns: 3 },
  { id: 'win', label: '⊞', columns: 2 },
  { id: 'alt-left', label: 'Alt', columns: 2 },
  { id: 'space', label: 'Espace', columns: 11 },
  { id: 'alt-right', label: 'Alt', columns: 2 },
  { id: 'win-right', label: '⊞', columns: 2 },
  { id: 'ctrl-right', label: 'Ctrl', columns: 2 },
  { id: 'arrow-left', label: '←' },
  { id: 'arrow-group', label: '', columns: 2 }, // Mettre à jour le groupe
  { id: 'arrow-right', label: '→' },
];

const MyKeyboard = () => {
  const [level, setLevel] = useState<string>(''); // Niveau sélectionné
  const [withColors, setWithColor] = useState<boolean>(false);
  const [hiddenKeys, setHiddenKeys] = useState<Key[]>([]); // Les touches masquées
  const [selectedHiddenKey, setSelectedHiddenKey] = useState<Key>(); // la touche à retrouver sélectionnée
  const [revealedKeys, setRevealedKeys] = useState<Key[]>([]); // Les touches révélées

  const shuffleArray = (array: any[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Fonction pour sélectionner un niveau
  const handleLevelChange = (event: SelectChangeEvent<string>) => {
    setLevel(event.target.value as string);
  };

  // Fonction pour démarrer la session et masquer les touches aléatoirement pour le niveau débutant
  const startMyKeyboardSession = (level: string) => {
    if (level === '1') {
      const allKeys = keys.filter((key) =>
        /^[a-z0-9&é"'(§è!çà)]$/i.test(key.id),
      );
      const shuffledKeys = allKeys.sort(() => 0.5 - Math.random());
      const randomHiddenKeys = shuffledKeys.slice(0, 4).map((key) => key);
      setHiddenKeys(randomHiddenKeys);
      setRevealedKeys([]);
    } else if (level === '2') {
      const letterKeys = keys.filter((key) => /^[a-z]$/i.test(key.id));
      const shuffledLetterKeys = shuffleArray(letterKeys);
      setHiddenKeys(letterKeys);
      setRevealedKeys([]);
    }
  };

  // Fonction pour afficher une touche masquée
  const handleRevealKey = (key: Key) => {
    if (hiddenKeys.includes(key)) {
      setSelectedHiddenKey(key);
    }
  };

  const handleKeyPress = (key: Key) => {
    if (selectedHiddenKey == key) {
      setRevealedKeys([...revealedKeys, key]);
      setHiddenKeys(hiddenKeys.filter((k) => k !== key));
    }
  };

  const handleWithColorChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setWithColor(event.target.checked);
  };

  const renderKey = (key: Key) => (
    <Button
      key={key.id}
      variant="contained"
      color={
        withColors
          ? (key.color ?? ('inherit' as keyof ButtonPropsColorOverrides))
          : ('inherit' as keyof ButtonPropsColorOverrides)
      }
      className={`key ${key.id}`}
      sx={{
        gridColumn: key.columns ? `span ${key.columns}` : undefined,
        gridRow: key.rows ? `span ${key.rows}` : undefined,
        textTransform: 'none',
        backgroundColor: withColors ? (key.color ?? 'white') : 'white',
        color: 'black',
      }}
      onClick={() => handleKeyPress(key)}
    >
      {hiddenKeys.includes(key) ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="100%"
          sx={{ color: 'transparent' }}
        >
          {key.label.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </Box>
      ) : key.label.includes('\n') ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100%"
          width="100%"
          padding={0}
        >
          {key.label.split('\n').map((line, index) => (
            <div
              key={index}
              style={{ alignSelf: index === 0 ? 'flex-start' : 'flex-end' }}
            >
              {line}
            </div>
          ))}
        </Box>
      ) : (
        key.label
      )}
    </Button>
  );

  return (
    <Grid container spacing={2} sx={{ p: 2, backgroundColor: 'white' }}>
      <Grid size={12}>
        <Typography variant="h4" component="h5" color="black">
          Découvrir mon clavier
        </Typography>
      </Grid>

      <Grid size={12}>
        <Paper
          elevation={3}
          component="section"
          sx={{ p: 2, backgroundColor: 'white' }}
        >
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="select-level">Niveau</InputLabel>
              <Select
                labelId="select-level"
                id="level-select"
                value={level}
                onChange={handleLevelChange}
                label="Niveau"
              >
                <MenuItem value="1">Débutant</MenuItem>
                <MenuItem value="2">Intermédiaire</MenuItem>
                <MenuItem value="3">Expert</MenuItem>
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={withColors}
                  onChange={handleWithColorChange}
                />
              }
              label="Avec les couleurs"
              labelPlacement="start"
            />

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Button
                variant="contained"
                size="large"
                endIcon={<PlayArrowIcon />}
                disabled={!level}
                onClick={() => startMyKeyboardSession(level)}
              >
                Démarrer
              </Button>
            </FormControl>
          </Stack>
        </Paper>
      </Grid>

      {/* Section pour les touches masquées */}
      {hiddenKeys.length > 0 && (
        <Grid size={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="subtitle1">
              Retrouver ces touches sur le clavier :
            </Typography>
            <Stack
              spacing={{ xs: 2, sm: 4 }}
              direction="row"
              useFlexGap
              sx={{ flexWrap: 'wrap' }}
            >
              {hiddenKeys.map((key) => (
                <Button
                  key={key.id}
                  variant="contained"
                  onClick={() => handleRevealKey(key)}
                >
                  {key.label}
                </Button>
              ))}
            </Stack>
          </Paper>
        </Grid>
      )}

      {hiddenKeys.length === 0 && revealedKeys.length === 4 && (
        <Grid size={12}>
          <Paper elevation={0} sx={{ p: 2 }}>
            {
              <Typography variant="h6" color="success.main">
                Félicitations, vous avez réussi !
              </Typography>
            }
          </Paper>
        </Grid>
      )}

      <Grid size={12}>
        {/* <Paper
          elevation={3}
          component="section"
          sx={{ p: 2, backgroundColor: 'white' }}
        > */}
        <Box className="keyboard-base">
          {keys.map((key) => {
            if (key.id === 'arrow-group') {
              return (
                <Box
                  key={key.id}
                  className="group"
                  sx={{ gridColumn: `span ${key.columns}` }}
                >
                  <Button
                    className="subkey"
                    variant="contained"
                    sx={{
                      backgroundColor: withColors
                        ? (key.color ?? 'white')
                        : 'white',
                      color: 'black',
                    }}
                  >
                    ↑
                  </Button>
                  <Button
                    className="subkey"
                    variant="contained"
                    sx={{
                      backgroundColor: withColors
                        ? (key.color ?? 'white')
                        : 'white',
                      color: 'black',
                    }}
                  >
                    ↓
                  </Button>
                </Box>
              );
            }
            return renderKey(key);
          })}
        </Box>
        {/* </Paper> */}
      </Grid>
    </Grid>
  );
};

export default MyKeyboard;
