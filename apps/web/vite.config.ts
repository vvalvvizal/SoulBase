import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';
import tailwindcss from '@tailwindcss/vite';

dotenv.config({ path: path.resolve(__dirname, '../../../../apps/web/.env') });

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@soulBase/ui': path.resolve(__dirname, '../../libs/ui'),
      '@soulBase/network': path.resolve(__dirname, '../../libs/network'),
    },
  },
  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
});
