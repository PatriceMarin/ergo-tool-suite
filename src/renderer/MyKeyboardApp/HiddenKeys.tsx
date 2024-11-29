import React from 'react';
import Box from '@mui/material/Box';
import { Paper, Typography } from '@mui/material';
import { IKey } from './Types';
import Key from './Key';

interface HiddenKeysProps {
  hiddenKeys: IKey[];
  selectedKey: IKey | null;
  onRevealKey: (key: IKey) => void;
}

const hiddenKeysComponent = ({
  hiddenKeys,
  selectedKey,
  onRevealKey,
}: HiddenKeysProps) => (
  <Paper elevation={3} sx={{ p: 2 }}>
    <Typography variant="subtitle1">
      Retrouver ces touches sur le clavier :
    </Typography>
    <Box className="hidden-keys">
      {hiddenKeys.map((key) => (
        <Key
          key={`hiddenKeys-${key.id}`}
          keyData={key}
          onKeyPress={() => onRevealKey(key)}
          hidden={false}
          withColors={false}
          isSelected={selectedKey === key}
          isDisabled={false}
        />
      ))}
    </Box>
  </Paper>
);
export default hiddenKeysComponent;
