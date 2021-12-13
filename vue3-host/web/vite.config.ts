import { resolve } from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import federation from '@originjs/vite-plugin-federation';
import compress from 'vite-plugin-compress';
import { minifyHtml } from 'vite-plugin-html';

export default defineConfig({
  root: resolve(process.cwd(), 'web'),
  base: '/apps/',
  resolve: {
    alias: {
      '~/': `${resolve(__dirname, 'src')}/`,
      '@static': `${resolve(__dirname, 'static')}/`,
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Pages({
      extensions: ['vue', 'md'],
      dirs: [{ dir: 'src/pages', baseRoute: '/apps/' }],
    }),
    Layouts(),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core'],
      dts: resolve(__dirname, 'src/auto-imports.d.ts'),
    }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: resolve(__dirname, 'src/components.d.ts'),
    }),
    federation({
      name: 'vue3-host',
      remotes: {
        vue2remote: {
          external: 'http://127.0.0.1:5000/remoteEntry.js',
          format: 'var',
        },
      },
    }),
    minifyHtml(),
    compress({
      brotli: false,
      extensions: ['png'],
      pngquant: {
        quality: [0.7, 0.9],
        speed: 4,
      },
    }),
  ],

  optimizeDeps: {
    include: ['vue', 'vue-router', '@vueuse/core'],
    exclude: ['vue2remote/Header', 'vue2remote/Footer'],
  },
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, 'home.html'),
        pointsmall: resolve(__dirname, 'pointsmall.html'),
      },
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(eot|ttf|woff)$/.test(name)) {
            return 'font/[name]-[hash].[ext]';
          }
          if (/\.(png|jpe?g|gif|svg)$/.test(name)) {
            return 'images/[name]-[hash].[ext]';
          }
          if (/\.css$/.test(name)) {
            return 'css/[name]-[hash].[ext]';
          }
          if (/\.js$/.test(name)) {
            return 'js/[name]-[hash].[ext]';
          }
          console.log('info', name);
          return '[ext]/[name]-[hash].[ext]';
        },
      },
    },
  },
});
