export const colorSchemes = ['light', 'dark'] as const;
// This is the list of possible color scheme modes, including the system mode
export const possibleColorSchemeModes = [...colorSchemes, 'system'] as const;

export type ColorSchemeKey = (typeof colorSchemes)[number];
export type ColorSchemeMode = (typeof possibleColorSchemeModes)[number];
export type ColorScheme = {
  primary: ColorSchemeKey;
  secondary: ColorSchemeKey;

  serverSideSystemScheme: boolean | null;
  clientSideSystemScheme: boolean | null;

  currentMode: ColorSchemeMode;
  platformSystemSupport: boolean;
  className: string;
};

export interface ColorSchemeOptions {
  default?: ColorSchemeKey;
  systemScheme?: boolean;
}
