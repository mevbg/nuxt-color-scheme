import { defineNuxtPlugin, useCookie, useRequestHeaders } from '#app';
import { ref, type Ref, watch } from 'vue';
import type { ColorSchemeMode } from '../composables/color-scheme.composable';
import { useColorScheme } from '../composables/color-scheme.composable';

export default defineNuxtPlugin(() => {
  // Get the needed stuff from the Color Scheme composable
  const {
    primary,
    secondary,
    serverSideSystemScheme,
    clientSideSystemScheme,
    currentMode,
    className,
    systemSupport
  } = useColorScheme();

  // Get cookie (if such)
  const cookieColorScheme: Ref<string | undefined> = useCookie('colorScheme');

  // Get system color scheme (if such)
  const { 'sec-ch-prefers-color-scheme': secChPrefersColorScheme } = useRequestHeaders([
    'sec-ch-prefers-color-scheme'
  ]);
  const systemColorScheme = ref<string | undefined>(secChPrefersColorScheme);

  // Returns class name based on cookie and system support
  const resolveClassName = () => {
    const secondaryMatchesSystemColorScheme =
      systemSupport.value &&
      (import.meta.server && systemColorScheme.value
        ? secondary.value === systemColorScheme.value
        : import.meta.client &&
          window?.matchMedia(`(prefers-color-scheme: ${secondary.value})`).matches);

    className.value =
      cookieColorScheme.value === secondary.value ||
      (!cookieColorScheme.value && secondaryMatchesSystemColorScheme)
        ? secondary.value
        : '';
  };

  // Resolve the flags for system color scheme support
  // in both server-side and client-side
  serverSideSystemScheme.value = import.meta.server && !!systemColorScheme.value;
  clientSideSystemScheme.value =
    import.meta.client && window.matchMedia('(prefers-color-scheme)').media !== 'not all';

  // Resolve the initial mode
  // and set it to currentMode in the store
  currentMode.value = (cookieColorScheme.value ||
    (systemSupport.value ? 'system' : primary.value)) as ColorSchemeMode;

  // This should be stored in a const because each time it's a different instance
  //  and the removal of the event listener doesn't work
  const mql = import.meta.client ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  // Watch for changes in the current mode
  // and update the cookie and class name accordingly
  watch(
    () => currentMode.value,
    (newMode, oldMode) => {
      cookieColorScheme.value =
        (!systemSupport.value && newMode) || newMode !== 'system' ? newMode : undefined;

      // Resolve the initial class name
      // and set it to className in the store
      resolveClassName();

      // Add or remove the event listener based on the changed mode
      if (import.meta.client && mql) {
        if (newMode === 'system') {
          mql.addEventListener('change', resolveClassName);
        }
        if (oldMode === 'system') {
          mql.removeEventListener('change', resolveClassName);
        }
      }
    },
    { immediate: true }
  );
});
