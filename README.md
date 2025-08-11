# Mev’s Nuxt Color Scheme

> A personal color scheme module developed for Nuxt

[![npm version][npm-version-src]][npm-version-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

## 🎯 Overview

This module represents a personal solution for managing color schemes in Nuxt applications, developed based on personal preferences and needs. As such, it follows a minimalist approach and doesn’t offer extensive configuration, but instead focuses on simplicity and efficiency.

The module follows the philosophy and principles described in the article ["From System Preferences to User Choice: Color Scheme Options in Modern Web Development"](https://medium.com/@mevbg/from-system-preferences-to-user-choice-color-scheme-options-in-modern-web-development-c316f9c49b04), prioritizing user choice and system preferences while maintaining an intuitive and accessible user experience.

Although developed as a personal tool, the module is publicly available and has no restrictions for use by other developers. If there’s interest from third parties, they can freely explore it and use it in their own projects without any issues.

## 🚀 Features

This module implements a comprehensive color scheme strategy with the following key features:

### Configuration Options

#### **`default`**

Sets the default color scheme ( `'light'` | `'dark'` ).

- **Type**: `string` _(optional)_
- **Default**: `'light'`
- **Description**: This option determines whether a class will be applied to the HTML element for the currently selected scheme that differs from the default. The logic assumes that CSS styles relying on this approach will have colors for the default scheme defined outside class-based selector. For example, if the default is `'light'`, all colors won't be within the `html.light` block scope, and the module won't apply the `light` class to the HTML element when the light scheme is selected. Instead, it will only apply the `dark` class to trigger the defined CSS colors for the dark scheme within the `html.dark` block scope.

#### **`systemScheme`**

Enables system preference detection.

- **Type**: `boolean` _(optional)_
- **Default**: `true`
- **Description**: This option plays a role in determining what switching options are provided by the `useColorScheme` composable. When enabled _(as it is by default)_ and if the client's system allows it _(with appropriate checks)_, the composable will return three available modes: `light`, `dark`, and `system`.

### Technical Implementation

- **Sec-CH-Prefers-Color-Scheme Header**:
  Utilizes the `Sec-CH-Prefers-Color-Scheme` header (if possible) for enhanced system preference detection.
- **Cookie-based Storage**:
  Uses cookies to store specific scheme preferences different from system settings. This is intentional to ensure the cookie is part of request headers, allowing the server-side to prepare proper HTML element rendering at the server level.

## 📦 Setup

1. Install the module to your Nuxt application with one command:

```bash
npx nuxi module add @mevbg/nuxt-color-scheme
```

2. Include it in the modules list in `nuxt.config.ts`:

```ts
// nuxt.config.ts

export default defineNuxtConfig({
  modules: ['@mevbg/nuxt-color-scheme'],

  colorScheme: {
    default: 'light' // 'light' | 'dark'
  }
});
```

That's it!
You can now use `Mev’s Nuxt Color Scheme` in your Nuxt app. ✨

## ⚙️ Usage

The `useColorScheme` composable is automatically imported in the Nuxt environment and can be used directly without any manual imports.

```ts
const {
  // The default color scheme (light/dark)
  primary,

  // The other color scheme (opposite of primary)
  secondary,

  // Whether system scheme is detected on server-side
  serverSideSystemScheme,

  // Whether system scheme is detected on client-side
  clientSideSystemScheme,

  // Currently selected color scheme mode (light/dark/system)
  currentMode,

  // CSS class name to apply to HTML element
  className,

  // Whether system scheme is enabled in config
  platformSystemSupport,

  // Function to change the current color scheme mode
  setColorSchemeMode,

  // Whether client supports system scheme detection
  clientSystemSupport,

  // Whether system scheme is fully supported
  systemSupport,

  // Array of available color scheme modes
  availableModes
} = useColorScheme();
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Release new version
npm run release
```

## 🤝🏻 Contributing

This is a personal tool and no contributions are expected.
At least for now. 😋

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/%40mevbg%2Fnuxt-color-scheme/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@mevbg/nuxt-color-scheme
[license-src]: https://img.shields.io/npm/l/%40mevbg%2Fnuxt-color-scheme.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://github.com/mevbg/nuxt-color-scheme/blob/main/LICENSE
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
