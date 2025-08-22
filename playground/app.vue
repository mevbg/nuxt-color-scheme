<template>
  <div :style="{ textAlign: 'center' }">
    <h1>Mev’s Nuxt Color Scheme</h1>

    <ClientOnly>
      <div
        :style="{
          marginBottom: '1rem'
        }"
      >
        <ColorSchemeButton @click="handleColorSchemeClick" />
      </div>

      <div
        v-if="colorSchemeControllers"
        :style="{
          display: 'inline-flex',
          justifyContent: 'left',
          gap: '20px'
        }"
      >
        <div v-for="(btn, index) in colorSchemeModes" :key="index" @click="setColorSchemeMode(btn)">
          <div
            :style="{
              display: 'inline-flex',
              justifyContent: 'left',
              gap: '4px',
              cursor: 'pointer'
            }"
          >
            <input
              :id="btn"
              v-model="colorSchemeMode"
              name="colorSchemeMode"
              type="radio"
              :value="btn"
              :style="{
                cursor: 'pointer'
              }"
            />
            <label
              :for="btn"
              :style="{
                cursor: 'pointer'
              }"
            >
              {{ btn.charAt(0).toUpperCase() + btn.slice(1) }}
            </label>
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
  import ColorSchemeButton from '../src/runtime/components/ColorSchemeButton.vue';

  const {
    availableModes: colorSchemeModes,
    currentMode: colorSchemeMode,
    className: colorSchemeClassName,
    setColorSchemeMode
  } = useColorScheme();

  useHead({
    htmlAttrs: {
      class: computed(() => colorSchemeClassName.value),
      lang: 'bg-BG'
    }
  });

  const colorSchemeControllers = ref<boolean>(false);

  const handleColorSchemeClick = () => {
    colorSchemeControllers.value = !colorSchemeControllers.value;
  };
</script>

<style>
  body {
    font-family: system-ui;
  }

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
