/// <reference types="histoire" />
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

import { HstVue } from '@histoire/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  histoire: {
    plugins: [HstVue()],
    setupFile: './histoire.setup.ts',
    viteIgnorePlugins: ['vite:html', 'vite-plugin-some-stuff'],
  },
});
