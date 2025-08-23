import { defineNuxtPlugin, useCookie, useRequestHeaders } from '#app';
import { type Ref, watch } from 'vue';
import type { ColorSchemeKey, ColorSchemeMode } from '../../types';
import { useColorScheme } from '../composables/color-scheme.composable';

export default defineNuxtPlugin(() => {
  // Get the needed stuff from the Color Scheme composable
  const {
    // Color scheme definitions
    primary,
    secondary,

    // System-color-scheme-related data
    serverSideSystemScheme,
    clientSideSystemScheme,
    systemSupport,
    systemColorScheme,

    // Current states
    currentColorScheme,
    currentMode,
    currentClassName
  } = useColorScheme();

  // Get cookie (if such)
  const cookieColorScheme: Ref<string | undefined> = useCookie('colorScheme');

  // Get system color scheme (if such)
  const { 'sec-ch-prefers-color-scheme': secChPrefersColorScheme } = useRequestHeaders([
    'sec-ch-prefers-color-scheme'
  ]);

  // Returns class name based on cookie and system support
  const resolveData = () => {
    const secondaryMatchesSystemColorScheme =
      systemSupport.value &&
      (import.meta.server && secChPrefersColorScheme
        ? secondary.value === secChPrefersColorScheme
        : import.meta.client &&
          window?.matchMedia(`(prefers-color-scheme: ${secondary.value})`).matches);

    currentClassName.value =
      cookieColorScheme.value === secondary.value ||
      (!cookieColorScheme.value && secondaryMatchesSystemColorScheme)
        ? secondary.value
        : '';

    systemColorScheme.value =
      (import.meta.server && (secChPrefersColorScheme as ColorSchemeKey)) ||
      ((import.meta.client && window?.matchMedia(`(prefers-color-scheme: ${primary.value})`).matches
        ? primary.value
        : secondary.value) as ColorSchemeKey);

    currentColorScheme.value = (cookieColorScheme.value ||
      systemColorScheme.value ||
      primary.value) as ColorSchemeKey;
  };

  // Resolve the flags for system color scheme support
  // in both server-side and client-side
  serverSideSystemScheme.value = import.meta.server && !!secChPrefersColorScheme;
  clientSideSystemScheme.value =
    import.meta.client && window.matchMedia('(prefers-color-scheme)').media !== 'not all';

  // Resolve the initial mode
  // and set it to currentMode in the store
  currentMode.value = (cookieColorScheme.value ||
    (systemSupport.value ? 'system' : primary.value)) as ColorSchemeMode;

  if (serverSideSystemScheme.value || import.meta.client) {
    // This should be stored in a const because each time it's a different instance
    //  and the removal of the event listener doesn't work
    const mql = import.meta.client ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    // Watch for changes in the current mode
    // and update the cookie and class name accordingly
    watch(
      () => currentMode.value,
      (newMode, oldMode) => {
        // Update cookieColorScheme based on the new mode
        cookieColorScheme.value =
          (!systemSupport.value && newMode) || newMode !== 'system' ? newMode : undefined;

        // Update currentClassName, systemColorScheme and currentColorScheme
        resolveData();

        // Add or remove the event listener based on the changed mode
        if (mql) {
          if (newMode === 'system') {
            mql.addEventListener('change', resolveData);
          }
          if (oldMode === 'system') {
            mql.removeEventListener('change', resolveData);
          }
        }
      },
      { immediate: true }
    );
  }
});
