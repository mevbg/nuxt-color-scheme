<template>
  <div>
    <h1 :style="{ textAlign: 'center', fontFamily: 'system-ui' }">Nuxt Color Scheme</h1>
  </div>
</template>

<script setup>
const {
  // availableModes: colorSchemeModes,
  // currentMode: colorSchemeMode,
  className: colorSchemeClassName
  // setColorSchemeMode
} = useColorScheme();

useHead({
  htmlAttrs: {
    class: computed(() => colorSchemeClassName.value)
  }
});
</script>

<style>
/* Light as default */
:root {
  --color-background: white;
  --color-text: black;
}

.dark {
  --color-background: black;
  --color-text: white;
}

/* Dark as default */
/* :root {
  --color-background: black;
  --color-text: white;
}

.light {
  --color-background: white;
  --color-text: black;
} */

body {
  background-color: var(--color-background);
  color: var(--color-text);
}
</style>
