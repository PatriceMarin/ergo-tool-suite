import React from 'react';
import { Button, Box } from '@mui/material';
import KeyHiddenLabel from './KeyHiddenLabel';
import KeyMultiLineLabel from './KeyMultiLineLabel';
import { IKey } from './Types';

interface KeyProps {
  keyData: IKey;
  onKeyPress: (key: IKey) => void;
  isDisabled: boolean;
  isSelected: boolean | null;
  hidden: boolean;
  withColors: boolean;
}

const Key: React.FC<KeyProps> = ({
  isDisabled,
  isSelected,
  keyData,
  withColors,
  hidden,
  onKeyPress,
}) => {
  const renderHiddenLabel = () => <KeyHiddenLabel keyData={keyData} />;

  const renderMultiLineLabel = () => <KeyMultiLineLabel keyData={keyData} />;

  const renderArrowGroup = () => (
    <Box
      key={`box-key-${keyData.id}`}
      className="group"
      sx={{ gridColumn: `span ${keyData.columns}` }}
    >
      <Button
        className="subkey"
        variant="contained"
        sx={{
          backgroundColor: withColors ? (keyData.color ?? 'white') : 'white',
          color: 'black',
        }}
        disabled={isDisabled}
        onClick={() => onKeyPress({ ...keyData, label: '↑' })}
      >
        ↑
      </Button>
      <Button
        className="subkey"
        variant="contained"
        sx={{
          backgroundColor: withColors ? (keyData.color ?? 'white') : 'white',
          color: 'black',
        }}
        disabled={isDisabled}
        onClick={() => onKeyPress({ ...keyData, label: '↓' })}
      >
        ↓
      </Button>
    </Box>
  );

  const renderDefaultKey = () => (
    <Box display="flex">
      {keyData.label.split('\n').map((line: string, index: number) => (
        <div key={`${keyData.id}-${index}`}>{line}</div>
      ))}
    </Box>
  );

  const renderLabel = () => {
    if (hidden) {
      return renderHiddenLabel();
    }
    if (keyData.label.includes('\n')) {
      return renderMultiLineLabel();
    }
    return renderDefaultKey();
  };

  if (keyData.id === 'arrow-group') {
    return renderArrowGroup();
  }

  return (
    <Button
      disabled={isDisabled}
      variant="contained"
      color={
        withColors
          ? (keyData.color ?? 'customBlack')
          : isSelected
            ? 'customWhite'
            : 'customBlack'
      }
      className={`key ${keyData.id}`}
      sx={{
        gridColumn: keyData.columns ? `span ${keyData.columns}` : undefined,
        gridRow: keyData.rows ? `span ${keyData.rows}` : undefined,
        textTransform: 'none',
        color: isSelected ? 'white' : 'black',
      }}
      onClick={() => onKeyPress(keyData)}
    >
      {renderLabel()}
    </Button>
  );
};

export default Key;
