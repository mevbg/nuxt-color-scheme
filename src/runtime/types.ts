// List of constant color schemes
export const colorSchemes = ['light', 'dark'] as const;

// List of possible color scheme modes, including the 'system' one
export const possibleColorSchemeModes = ['system', ...colorSchemes] as const;

// Type for names of color schemes
export type ColorSchemeKey = (typeof colorSchemes)[number];

// Type for names of color scheme modes
export type ColorSchemeMode = (typeof possibleColorSchemeModes)[number];

// The module options interface
export interface ColorSchemeOptions {
  primaryScheme?: ColorSchemeKey;
  systemScheme?: boolean;
}
