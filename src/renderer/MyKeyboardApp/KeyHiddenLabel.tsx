import React from 'react';
import { Box } from '@mui/material';
import { IKey } from './Types';

interface KeyHiddenLabelProps {
  keyData: IKey;
}

const KeyHiddenLabel: React.FC<KeyHiddenLabelProps> = ({ keyData }) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100%"
    width="100%"
    sx={{ color: 'transparent' }}
  >
    {keyData.label.split('\n').map((line: string, index: number) => (
      <div key={`${keyData.id}-hidden-${index}`}>{line}</div>
    ))}
  </Box>
);

export default KeyHiddenLabel;
