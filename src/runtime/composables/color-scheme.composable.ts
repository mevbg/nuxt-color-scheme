import { useRuntimeConfig } from '#app';
import { computed, ref } from 'vue';
import type { ColorSchemeKey, ColorSchemeMode, ColorSchemeOptions } from '../../types';
import { possibleColorSchemeModes } from '../../types';
import { DEFAULT_PRIMARY_COLOR_SCHEME } from '../defaults';

// Color scheme definitions
const primary = ref<ColorSchemeKey>(DEFAULT_PRIMARY_COLOR_SCHEME);
const secondary = computed<ColorSchemeKey>(() => (primary.value === 'light' ? 'dark' : 'light'));

// System-color-scheme-related data
const serverSideSystemScheme = ref<boolean | null>(null);
const clientSideSystemScheme = ref<boolean | null>(null);
const clientSystemSupport = computed(
  () => serverSideSystemScheme.value || clientSideSystemScheme.value
);
const appSystemSupport = ref<boolean>(true);
const systemSupport = computed(() => appSystemSupport.value && clientSystemSupport.value);
const systemColorScheme = ref<ColorSchemeKey | undefined>(undefined);

// Current states
const currentColorScheme = ref<ColorSchemeKey>(primary.value);
const currentMode = ref<ColorSchemeMode>(primary.value);
const currentClassName = ref<string>('');
const availableModes = computed(() =>
  systemSupport.value
    ? possibleColorSchemeModes
    : possibleColorSchemeModes.filter((mode) => mode !== 'system')
);

// Function that sets the color scheme mode
function setColorSchemeMode(mode: ColorSchemeMode) {
  currentMode.value = mode;
}

// Composable
export function useColorScheme() {
  // Get the runtime config
  const config = useRuntimeConfig();

  // Set the primary color scheme
  primary.value = (config?.public?.colorScheme as ColorSchemeOptions)
    ?.primaryScheme as ColorSchemeKey;

  // Set the platform system support
  appSystemSupport.value = (config?.public?.colorScheme as ColorSchemeOptions)
    ?.systemScheme as boolean;

  // Expose data and methods
  return {
    // Color scheme definitions
    primary,
    secondary,

    // System-color-scheme-related data
    serverSideSystemScheme,
    clientSideSystemScheme,
    clientSystemSupport,
    appSystemSupport,
    systemSupport,
    systemColorScheme,

    // Current states
    currentColorScheme,
    currentMode,
    currentClassName,
    availableModes,

    // Methods
    setColorSchemeMode
  };
}
