import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';
import tailwindcss from '@tailwindcss/vite';
import autoprefixer from 'autoprefixer';

dotenv.config({ path: path.resolve(__dirname, '../../../../apps/web/.env') });

export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      //'@soulBase/ui': path.resolve(__dirname, '../../libs/ui/src'),
    },
  },
});
