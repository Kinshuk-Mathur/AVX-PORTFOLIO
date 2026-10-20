import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    copyPublicDir: false,
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['motion/react'],
          scroll: ['gsap', 'gsap/ScrollTrigger', 'lenis'],
        },
      },
    },
  },
});
