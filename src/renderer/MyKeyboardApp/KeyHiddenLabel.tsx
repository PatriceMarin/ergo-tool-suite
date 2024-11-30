import React from 'react';
import { Box } from '@mui/material';
import { IKey } from './Types';

interface KeyHiddenLabelProps {
  keyData: IKey;
}

function KeyHiddenLabel({ keyData }: Readonly<KeyHiddenLabelProps>) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
      sx={{ color: 'transparent' }}
    >
      {keyData.label.split('\n').map((line: string) => (
        <div key={`${keyData.id}-hidden`}>{line}</div>
      ))}
    </Box>
  );
}

export default KeyHiddenLabel;
