// src/types/global.d.ts

import { ButtonPropsColorOverrides } from '@mui/material/Button';

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    customWhite: true;
    customBlack: true;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    customWhite: Palette['primary'];
    customBlack: Palette['primary'];
  }
  interface PaletteOptions {
    customWhite?: PaletteOptions['primary'];
    customBlack?: PaletteOptions['primary'];
  }
}
