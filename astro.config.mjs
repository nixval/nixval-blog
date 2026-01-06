// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { remarkAdmonitions } from './src/plugins/remark-admonitions.mjs'; 
import remarkDirective from 'remark-directive';
// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkDirective, remarkAdmonitions],
    shikiConfig: {
      theme: 'dracula',
      wrap: true, 
    },
  },
  vite: {
    plugins: [
      // Tailwind CSS v4 Plugin
      tailwindcss(),
    ],
  },
});
