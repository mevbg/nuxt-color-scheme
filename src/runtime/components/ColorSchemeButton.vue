<template>
  <button
    :class="['theme-toggle', { ['theme-toggle--toggled']: currentColorScheme === 'dark' }]"
    type="button"
    :aria-label="label"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      width="1.5em"
      height="1.5em"
      fill="currentColor"
      stroke-linecap="round"
      class="theme-toggle__classic"
      viewBox="0 0 32 32"
    >
      <clipPath id="theme-toggle__classic__cutout">
        <path d="M0-5h30a1 1 0 0 0 9 13v24H0Z" />
      </clipPath>
      <g clip-path="url(#theme-toggle__classic__cutout)">
        <circle cx="16" cy="16" r="9.34" />
        <g stroke="currentColor" stroke-width="1.5">
          <path d="M16 5.5v-4" />
          <path d="M16 30.5v-4" />
          <path d="M1.5 16h4" />
          <path d="M26.5 16h4" />
          <path d="m23.4 8.6 2.8-2.8" />
          <path d="m5.7 26.3 2.9-2.9" />
          <path d="m5.8 5.8 2.8 2.8" />
          <path d="m23.4 23.4 2.9 2.9" />
        </g>
      </g>
    </svg>
  </button>
</template>

<script setup>
  import { useColorScheme } from '#imports';

  const { currentColorScheme } = useColorScheme();

  defineProps({
    label: {
      type: String,
      default: 'Change color scheme'
    }
  });
</script>

<style>
  .theme-toggle {
    --theme-toggle__classic--duration: 500ms;

    cursor: pointer;
    border: none;
    background: 0 0;
    line-height: 0;
    color: currentColor;
  }

  .theme-toggle__classic path {
    transform-origin: center;
    transition-timing-function: cubic-bezier(0, 0, 0.15, 1.25);
    transition-duration: calc(var(--theme-toggle__classic--duration) * 0.8);
  }

  .theme-toggle__classic g path {
    transition-delay: calc(var(--theme-toggle__classic--duration) * 0.2);
    transition-property: opacity, transform;
  }

  .theme-toggle__classic :first-child path {
    transition-property: transform, d;
  }

  .theme-toggle input[type='checkbox']:checked ~ .theme-toggle__classic g path,
  .theme-toggle--toggled.theme-toggle .theme-toggle__classic g path {
    transform: scale(0.5) rotate(45deg);
    opacity: 0;
    transition-delay: 0s;
  }

  .theme-toggle input[type='checkbox']:checked ~ .theme-toggle__classic :first-child path,
  .theme-toggle--toggled.theme-toggle .theme-toggle__classic :first-child path {
    d: path('M-12 5h30a1 1 0 0 0 9 13v24h-39Z');
    transition-delay: calc(var(--theme-toggle__classic--duration) * 0.2);
  }

  @supports not (d: path('')) {
    .theme-toggle input[type='checkbox']:checked ~ .theme-toggle__classic :first-child path,
    .theme-toggle--toggled.theme-toggle .theme-toggle__classic :first-child path {
      /* prettier-ignore */
      transform: translate3d(-12Px, 10Px, 0);
    }
  }

  .theme-toggle input[type='checkbox'] {
    display: none;
  }

  .theme-toggle .theme-toggle-sr {
    position: absolute;

    overflow: hidden;
    /* prettier-ignore */
    width: 1Px;
    /* prettier-ignore */
    height: 1Px;
    /* prettier-ignore */
    margin: -1Px;
    padding: 0;
    border-width: 0;

    white-space: nowrap;

    clip: rect(0, 0, 0, 0);
  }

  @media (prefers-reduced-motion: reduce) {
    .theme-toggle:not(.theme-toggle--force-motion) * {
      transition: none !important;
    }
  }
</style>
