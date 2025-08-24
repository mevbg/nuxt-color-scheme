# Nuxt Color Scheme

> A color scheme module developed for Nuxt

[![npm version][npm-version-src]][npm-version-href]
[![nuxt][nuxt-src]][nuxt-href]
[![License][license-src]][license-href]

## 🎯 Overview

This module provides a comprehensive solution for managing color schemes in Nuxt applications, designed with simplicity and efficiency in mind. As such, it follows a minimalist approach and doesn’t offer extensive configuration, but instead focuses on simplicity and efficiency.

The module follows the philosophy and principles described in the article ["From System Preferences to User Choice: Color Scheme Options in Modern Web Development"](https://medium.com/@mevbg/from-system-preferences-to-user-choice-color-scheme-options-in-modern-web-development-c316f9c49b04), prioritizing user choice and system preferences while maintaining an intuitive and accessible user experience.

The module is open source, and available for the developer community to use, contribute to, and improve. If there’s interest from third parties, they can freely explore it and use it in their own projects without any issues.

## 🚀 Features

This module implements a comprehensive color scheme strategy with the following key features:

### Primary Color Scheme Selection

Unlike most front-end tools (_such as Tailwind, for example_), which fundamentally define `light` scheme as _primary_ scheme, and `dark` as the secondary one that requires an extra class, this module provides the ability to specify which should be the leading color scheme, and which should be the additional one.

This setting determines the name of the CSS class for the additional color scheme, which should be placed on the `<html>` element when it’s active. The default value of this setting is the `light` scheme, which makes integration with Tailwind possible.

### System Color Scheme Attachment Option

This setting (_enabled by default_) provides the ability to specify whether the project will take into account the system color scheme and accordingly whether it will be an available option in the list of color scheme modes, between which the user will be able to make a choice. When enabled, the `system` option will be added to the available `light` and `dark` modes.

> It is important to note that when this option is enabled, it will work provided that the client environment itself supports system-level color schemes. If not, then the list of the available modes will remain with the two options only.

### Sec-CH-Prefers-Color-Scheme Header

The module is designed to work with `Sec-CH-Prefers-Color-Scheme` (_when possible, of course_), by passing the header over the network, so that based on the received context, the corresponding values can be prepared at the server-side rendering level.

> At the time of development, it is known that
> **Firefox and Safari do not support Sec-CH-Prefers-Color-Scheme**.

### Cookie-based Memory

Instead of `localStorage`, the module creates **a cookie** to store specific scheme preferences different from system settings. This is intentional to ensure the cookie is part of request headers, so that based on the received context, the corresponding values can be prepared at the server-side rendering level.

### Prioritization

The module is built based on the following hierarchy of priorities, arranged in descending order:

```text
1. Cookie value

2. System value

3. Primary value
```

1. If the client’s system has a saved cookie with a color scheme value, this means that the corresponding color scheme has been explicitly specified by the user as permanent (_until further notice_) and this makes it the final active scheme.

2. If there is no saved cookie with a color scheme specified by the user, then the next possible active scheme comes from the system ones. This, of course, in the case that: both the system itself supports color schemes, and the project itself is configured to work with them.

3. As a last resort, if there is neither a saved cookie nor an available system color scheme, the specified primary scheme is taken as the active one.

## 📦 Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add @mevbg/nuxt-color-scheme
```

This will download the module and add it automatically to the list of modules declared in the Nuxt configuration file, as shown in the following example:

```ts
export default defineNuxtConfig({
  modules: ['@mevbg/nuxt-color-scheme']
});
```

That’s it!
You can now use `Nuxt Color Scheme` in your Nuxt app. ✨

## 🛠️ Configuration

The module is subject to configuration, which can look like this:

```ts
export default defineNuxtConfig({
  modules: ['@mevbg/nuxt-color-scheme'],

  colorScheme: {
    primaryScheme: 'light' // 'light' | 'dark'
    systemScheme: true // true | false
  }
});
```

More information about the possible settings is described in the following lines.

### Settings

The module provides only these two settings:

#### **`primaryScheme`**

Sets the primary color scheme ( `'light'` | `'dark'` ).

- **Type**: `string` _(optional)_
- **Default**: `'light'`
- **Description**: This option determines whether a class will be applied to the HTML element for the currently selected scheme that differs from the primary one. The logic assumes that CSS styles relying on this approach will have colors for the primary color scheme defined outside class-based selector. For example, if it’s `'light'`, all colors won't be within the `html.light` block scope, and the module won't apply the `light` class to the HTML element when the light scheme is selected. Instead, it will only apply the `dark` class to trigger the defined CSS colors for the dark scheme within the `html.dark` block scope.

#### **`systemScheme`**

Enables system preference detection.

- **Type**: `boolean` _(optional)_
- **Default**: `true`
- **Description**: This option plays a role in determining what switching options are provided by the `useColorScheme` composable. When enabled _(as it is by default)_ and if the client’s system allows it _(with appropriate checks)_, the composable will return three available modes: `light`, `dark`, and `system`.

## ⚙️ Usage

### `useColorScheme` Composable

The `useColorScheme` composable is automatically imported in the Nuxt environment and can be used directly without any manual imports.

```ts
const {
  // Color scheme definitions
  primary,
  secondary,

  // System-color-scheme-related data
  serverSideSystemScheme,
  clientSideSystemScheme,
  clientSystemSupport,
  appSystemSupport,
  systemSupport
  systemColorScheme,

  // Current states
  currentColorScheme,
  currentMode,
  currentClassName,
  availableModes,

  // Methods
  setColorSchemeMode
} = useColorScheme();
```

Here is information about all the values and methods that this composable provides:

#### **`primary`**

- **Type**: `ref<ColorSchemeKey>`
- **Default**: `'light'`
- **Description**: Stores the name of the primary color scheme. If such is not provided through the configuration object, the value remains the default set for the module.

#### **`secondary`**

- **Type**: `computed<ColorSchemeKey>`
- **Default**: `'dark'`
- **Description**: A reactive value that stores the name of the color scheme that is opposite to the primary one.

---

#### **`serverSideSystemScheme`**

- **Type**: `ref<boolean | null>`
- **Default**: `null`
- **Description**: Sets value to `true` if it detects a system color scheme at the server level through the `Sec-CH-Prefers-Color-Scheme` header.

> At the time of development, it is known that
> **Firefox and Safari do not support Sec-CH-Prefers-Color-Scheme**.

#### **`clientSideSystemScheme`**

- **Type**: `ref<boolean | null>`
- **Default**: `null`
- **Description**: Sets value to `true` if it detects a system color scheme at the client level through the `window.matchMedia` method.

#### **`clientSystemSupport`**

- **Type**: `computed<boolean | null>`
- **Default**: `null`
- **Description**: A reactive value that is `true` if at least one of the above two (`serverSideSystemScheme` / `clientSideSystemScheme`) is `true`.

#### **`appSystemSupport`**

- **Type**: `ref<boolean>`
- **Default**: `true`
- **Description**: Stores the flag whether the app itself should work with the system color scheme (if such is available). If no setting is provided through the configuration object, the value remains the default set for the module.

#### **`systemSupport`**

- **Type**: `computed<boolean | null>`
- **Default**: `null`
- **Description**: A reactive value that is `true` if at least one of the above two (`clientSystemSupport` / `appSystemSupport`) is `true`.

#### **`systemColorScheme`**

- **Type**: `ref<ColorSchemeKey | undefined>`
- **Default**: `undefined`
- **Description**: Stores the name of the current system color scheme (if such). It gets updated when the system color scheme changes.

---

#### **`currentColorScheme`**

- **Type**: `ref<ColorSchemeKey>`
- **Default**: `primary.value`
- **Description**: Stores the name of the current color scheme applied to the app.

#### **`currentMode`**

- **Type**: `ref<ColorSchemeMode>`
- **Default**: `primary.value`
- **Description**: Stores the name of the current color scheme mode.

#### **`currentClassName`**

- **Type**: `ref<string>`
- **Default**: `''`
- **Description**: Stores the string with the CSS class name (if such) that should be set to the `<html>` element.

#### **`availableModes`**

- **Type**: `computed<ColorSchemeMode[]>`
- **Description**: A reactive array containing the names of the available color scheme modes. If `systemSupport` is `true` the options includes `system` as well.

### Types

Here are the main TypeScript definitions:

```ts
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
```

## 💻 Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint check
npm run lint:check

# Run ESLint fix
npm run lint:fix

# Run Prettier check
npm run prettier:check

# Run Prettier fix
npm run prettier:fix
```

## 🤝🏻 Contributing

Contributions, suggestions, and improvements are welcome! Feel free to open issues or submit pull requests.

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/%40mevbg%2Fnuxt-color-scheme/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@mevbg/nuxt-color-scheme
[nuxt-src]: https://img.shields.io/badge/nuxt-%5E4.0.0-00DC82?logo=nuxt.js&colorA=020420
[nuxt-href]: https://nuxt.com
[license-src]: https://img.shields.io/npm/l/@mevbg/nuxt-color-scheme.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://github.com/mevbg/nuxt-color-scheme/blob/main/LICENSE
