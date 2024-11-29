import React from 'react';
import { Box } from '@mui/material';
import { IKey } from './Types';

interface KeyMultiLineLabelProps {
  keyData: IKey;
}

const KeyMultiLineLabel: React.FC<KeyMultiLineLabelProps> = ({ keyData }) => (
  <Box
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
    height="100%"
    width="100%"
    padding={0}
  >
    {keyData.label.split('\n').map((line: string, index: number) => (
      <div
        key={`${keyData.id}-label-${index}`}
        style={{ alignSelf: index === 0 ? 'flex-start' : 'flex-end' }}
      >
        {line}
      </div>
    ))}
  </Box>
);

export default KeyMultiLineLabel;
