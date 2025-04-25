import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/VLQ/',
  build: {
    outDir: 'docs'  // 👈 GitHub Pages용
  },
  plugins: [react()],
});