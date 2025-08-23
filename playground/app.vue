<template>
  <div
    :style="{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100dvh'
    }"
  >
    <ClientOnly>
      <div>
        <ColorSchemeButton class="icon" @click="openModal" />
      </div>

      <dialog ref="dialogRef" class="modal" @click="handleOutsideClick">
        <div class="controllers">
          <button
            v-for="(btn, index) in colorSchemeModes"
            :key="index"
            class="button"
            :class="{ active: btn === colorSchemeMode }"
            @click="handleColorSchemeClick(btn)"
          >
            {{ btn.charAt(0).toUpperCase() + btn.slice(1) }}
          </button>
        </div>
      </dialog>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
  import pkg from '../package.json';
  import ColorSchemeButton from '../src/runtime/components/ColorSchemeButton.vue';

  const {
    availableModes: colorSchemeModes,
    currentMode: colorSchemeMode,
    className: colorSchemeClassName,
    setColorSchemeMode
  } = useColorScheme();

  useHead({
    title: pkg.title,

    htmlAttrs: {
      class: computed(() => colorSchemeClassName.value),
      lang: 'bg-BG'
    }
  });
  const dialogRef = ref<HTMLDialogElement | null>(null);

  const openModal = () => {
    dialogRef.value?.showModal();
  };

  const closeModal = () => {
    dialogRef.value?.close();
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (event.target === dialogRef.value) {
      closeModal();
    }
  };

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  const handleColorSchemeClick = (mode: string) => {
    setColorSchemeMode(mode as 'light' | 'dark' | 'system');
    closeModal();
  };

  onMounted(() => {
    document.addEventListener('keydown', handleEscapeKey);
  });

  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscapeKey);
  });
</script>

<style>
  :root {
    --color-accent: 42, 130, 201;
  }

  /* Light as default */
  :root {
    --color-background: 255, 255, 255;
    --color-text: 0, 0, 0;
  }

  .dark {
    --color-background: 0, 0, 0;
    --color-text: 255, 255, 255;
  }

  /* Dark as default */
  /* :root {
    --color-background: 0, 0, 0;
    --color-text: 255, 255, 255;
  }

  .light {
    --color-background: 255, 255, 255;
    --color-text: 0, 0, 0;
  } */

  :focus,
  :focus-visible {
    outline: none;
  }

  html {
    overflow: hidden;
    font-size: min(1vw, 8px);
  }

  body {
    overflow: hidden;
    font-family: system-ui;
    margin: 0;
    background-color: rgba(var(--color-background), 0.9);
    color: rgba(var(--color-text), 1);
  }

  .icon {
    font-size: 50rem;
    transition: scale 0.2s ease-in-out;

    &:hover {
      scale: 1.1;
      cursor: pointer;
    }
  }

  .modal {
    width: 100vw;
    height: 100dvh;
    max-width: none;
    max-height: none;
    padding: 0;
    margin: 0;
    border: none;
    background-color: transparent;
  }

  .modal[open] {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal::backdrop {
    background-color: transparent;
    backdrop-filter: blur(2rem);
  }

  .controllers {
    aspect-ratio: 1;
    width: 80rem;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5rem;
    background-color: rgba(var(--color-background), 0.8);
    border-radius: 1rem;
    box-shadow: 0 0 100rem -8rem rgba(var(--color-text), 0.25);
  }

  .button {
    display: block;
    border-radius: 1rem;
    border: 0;
    appearance: none;
    cursor: pointer;
    width: 40rem;
    background-color: rgba(var(--color-text), 1);
    color: rgba(var(--color-background), 1);
    padding: 4rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 4rem;
    font-family: system-ui;
    font-weight: 600;
    user-select: none;

    transition:
      scale 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out,
      outline-offset 0.15s ease-in-out;

    &:not(.active):hover {
      scale: 1.05;
      outline: 0.3rem dotted rgba(var(--color-text), 1);
      outline-offset: 0.4rem;
    }
  }

  .button.active {
    pointer-events: none;
    background-color: rgba(var(--color-background), 1);
    color: rgba(var(--color-text), 1);
    outline: 0.3rem solid rgba(var(--color-text), 1);
    outline-offset: 0.4rem;
    box-shadow: 0 0 10rem -1rem rgba(var(--color-accent), 1);
  }
</style>
