import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

// The site is served from https://<user>.github.io/<repo>/ on GitHub Pages,
// so assets need the repository name as base path in production builds.
export default defineConfig(({command, isPreview}) => ({
  base: command === 'build' || isPreview ? '/Diploma-Presentation-Website/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}));
