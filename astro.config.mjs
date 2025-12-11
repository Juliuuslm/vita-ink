// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    preview: {
      host: '0.0.0.0',
      port: 3000,
    },
  }
});