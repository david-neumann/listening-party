import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/server': 'http://localhost:7070',
    },
  },
  plugins: [react()],
});
