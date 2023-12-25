import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.REACT_APP_SC_DISABLE_SPEEDY': JSON.stringify(true),
    'process.env.SC_DISABLE_SPEEDY': JSON.stringify(true),
  },
  build: {
    manifest: true,
    lib: {
      entry: path.resolve(__dirname, 'src/main.tsx'),
      name: 'radical_subscription_form',
      formats: ['iife'],
      fileName: (format) => `index.${format}.js`,
    },
  },
});
