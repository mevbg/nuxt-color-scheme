import { useRuntimeConfig } from '#app';
import { computed, ref } from 'vue';
import { DEFAULT_COLOR_SCHEME } from '../defaults';

export const colorSchemes = ['light', 'dark'] as const;
// This is the list of possible color scheme modes, including the system mode
export const possibleColorSchemeModes = ['system', ...colorSchemes] as const;

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

const defaultColorScheme = ref<ColorSchemeKey>(DEFAULT_COLOR_SCHEME);
const defaultColorSchemeMode = ref<ColorSchemeMode>(DEFAULT_COLOR_SCHEME);
const defaultColorSchemeClassName: string = '';
const defaultPrimary = computed(() => defaultColorSchemeMode.value);
const defaultSecondary = computed(() => (defaultPrimary.value === 'light' ? 'dark' : 'light'));

// State properties using ref()
const primary = computed(() => defaultPrimary.value as ColorSchemeKey);
const secondary = computed(() => defaultSecondary.value);
const serverSideSystemScheme = ref<boolean | null>(null);
const clientSideSystemScheme = ref<boolean | null>(null);
const systemColorScheme = ref<ColorSchemeKey | undefined>(undefined);
const currentColorScheme = ref<ColorSchemeKey>(defaultColorScheme.value);
const currentMode = ref<ColorSchemeMode>(defaultColorSchemeMode.value);
const className = ref<string>(defaultColorSchemeClassName);
const platformSystemSupport = ref<boolean>(true);

// Actions using functions
function setColorSchemeMode(mode: ColorSchemeMode) {
  currentMode.value = mode;
}

// Getters using computed()
const clientSystemSupport = computed(() => {
  return serverSideSystemScheme.value || clientSideSystemScheme.value;
});

const systemSupport = computed(() => {
  return platformSystemSupport.value && clientSystemSupport.value;
});

const availableModes = computed(() => {
  const modes = [...possibleColorSchemeModes];
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  return platformSystemSupport.value &&
    (serverSideSystemScheme.value || clientSideSystemScheme.value)
    ? modes
    : modes.filter((mode) => mode !== 'system');
});

export function useColorScheme() {
  const config = useRuntimeConfig();
  defaultColorSchemeMode.value = (config?.public?.colorScheme as any)?.default as ColorSchemeMode;
  platformSystemSupport.value = (config?.public?.colorScheme as any)?.systemScheme as boolean;

  return {
    // State properties
    primary,
    secondary,
    systemColorScheme,
    serverSideSystemScheme,
    clientSideSystemScheme,
    currentColorScheme,
    currentMode,
    className,
    platformSystemSupport,

    // Actions
    setColorSchemeMode,

    // Getters
    clientSystemSupport,
    systemSupport,
    availableModes
  };
}
