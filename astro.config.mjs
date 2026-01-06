// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { remarkAdmonitions } from './src/plugins/remark-admonitions.mjs'; 
import remarkDirective from 'remark-directive';
import remarkMath from 'remark-math';    
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://example.com',
  
  // FIX 1: Whitelist External Image Domains
  image: {
    domains: ['images.pexels.com'],
  },

  integrations: [
    mdx({
      remarkPlugins: [remarkDirective, remarkAdmonitions, remarkMath],
      rehypePlugins: [rehypeKatex],
    }), 
    sitemap()
  ],
  markdown: {
    remarkPlugins: [remarkDirective, remarkAdmonitions, remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: 'dracula',
      wrap: true, 
    },
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});
