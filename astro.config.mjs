import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import validateEnv from './src/integrations/validate-env.js';

const SITE_URL = process.env.PUBLIC_SITE_URL || 'https://uni-ia-workshop.vercel.app';
// Use Vercel image service apenas no deploy real (Vercel CI define VERCEL=1).
// Em local/preview, fica com o service Sharp default (gera _astro/...avif|webp).
const isVercelEnv = !!process.env.VERCEL;

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: false },
    imageService: isVercelEnv,
  }),
  integrations: [
    sitemap(),
    validateEnv(),
  ],
  build: {
    inlineStylesheets: 'always',
    assets: '_assets',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    domains: [],
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  compressHTML: true,
});
