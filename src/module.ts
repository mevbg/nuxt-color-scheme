import { addImports, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit';
import { DEFAULT_COLOR_SCHEME } from './runtime/defaults';
import type { ModuleOptions } from './types';

// Re-export types for TypeScript support
export * from './types';

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@mevbg/nuxt-color-scheme',
    configKey: 'colorScheme'
  },

  // Default configuration options of the Nuxt module
  defaults: {
    default: DEFAULT_COLOR_SCHEME
  },

  async setup(options, nuxt) {
    // Add the configuration to the runtime config
    nuxt.options.runtimeConfig.public.colorScheme = {
      ...options
    };

    // Create the path resolver
    const resolver = createResolver(import.meta.url);

    // Import the composable
    addImports([
      {
        name: 'useColorScheme',
        from: resolver.resolve('./runtime/composables/color-scheme.composable')
      }
    ]);

    // Do not add the extension since the `.ts` will be
    // transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugins/color-scheme.plugin'));

    // Add the server plugin for the headers to the Nitro config
    nuxt.hooks.hook('nitro:config', (config: any) => {
      config.plugins = config.plugins || [];
      config.plugins.push(resolver.resolve('./runtime/server/plugins/color-scheme.headers'));
    });
  }
});
