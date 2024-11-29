import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  Stack,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface ControlBarProps {
  level: string;
  withColors: boolean;
  onLevelChange: (event: SelectChangeEvent<string>) => void;
  onWithColorsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStart: () => void;
}

export default function ControlBar({
  level,
  withColors,
  onLevelChange,
  onWithColorsChange,
  onStart,
}: Readonly<ControlBarProps>) {
  return (
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
          onChange={onLevelChange}
          label="Niveau"
          variant="outlined"
        >
          <MenuItem value="1">Débutant</MenuItem>
          <MenuItem value="2">Intermédiaire</MenuItem>
          <MenuItem value="3">Expert</MenuItem>
          <MenuItem value="4">Ultime</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Switch
            color="primary"
            checked={withColors}
            onChange={onWithColorsChange}
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
          onClick={onStart}
        >
          Démarrer
        </Button>
      </FormControl>
    </Stack>
  );
}
