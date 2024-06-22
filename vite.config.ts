import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import viteCompression from 'vite-plugin-compression';
import vitePluginEnvirontment from 'vite-plugin-environment';
import * as path from 'path';

const timestamp = new Date().getTime();

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
    },
  },
  build: {
    minify: 'esbuild',
    emptyOutDir: true,
    sourcemap: false,
    cssCodeSplit: true,
    modulePreload: true,
    chunkSizeWarningLimit: 1000000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        chunkFileNames: `assets/js/[hash]-${timestamp}.js`,
        entryFileNames: `assets/js/[hash]-${timestamp}.js`,
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg|webp|avif)$/.test(name ?? '')) {
            return `assets/images/[hash]-${timestamp}[extname]`;
          }
          if (/\.(ttf|woff2|svg)$/.test(name ?? '')) {
            return `assets/font/[hash]-${timestamp}[extname]`;
          }
          if (/\.css$/.test(name ?? '')) {
            return `assets/css/[hash]-${timestamp}[extname]`;
          }
          return `assets/[hash]-${timestamp}[extname]`;
        },
      },
    },
  },
});
