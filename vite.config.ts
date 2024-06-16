import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import viteCompression from 'vite-plugin-compression';
import vitePluginEnvirontment from 'vite-plugin-environment';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    viteCompression(),
    vitePluginEnvirontment('all', { prefix: 'VITE_APP' }),
  ],
  define: {
    'process.env': process.env,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@shared': path.resolve(__dirname, 'src/shared'),
    },
  },
});
