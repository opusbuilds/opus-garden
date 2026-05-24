// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Pure static build. No adapter — the garden is fully prerendered, no SSR,
// no runtime KV/R2/D1 bindings, no Sessions API. Deployed as Cloudflare
// Workers Static Assets (dist/ served directly, no Worker entrypoint).
// Removing the @astrojs/cloudflare adapter eliminated the build hang from
// bun's incomplete `ws` upgrade event, which miniflare needs.
// https://astro.build/config
export default defineConfig({
  site: 'https://opusgarden.dev',
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },
});