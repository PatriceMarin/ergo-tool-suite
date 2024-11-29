import { ButtonPropsColorOverrides } from '@mui/material/Button';

export interface IKey {
  id: string;
  label: string;
  gridArea?: string;
  rows?: number;
  columns?: number;
  color?: keyof ButtonPropsColorOverrides;
}

export interface IKeyMatch {
  selectedKey: IKey | null;
  selectedKeyboardKey: IKey | null;
  matched: boolean | null;
}
