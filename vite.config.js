import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import viteCompression from 'vite-plugin-compression';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import legacy from '@vitejs/plugin-legacy';
import svgr from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
      tailwindcss(),
      svgr({
        svgrOptions: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
            ],
          },
        },
      }),
      ViteImageOptimizer({
        jpg: {
          quality: 80,
        },
        png: {
          quality: 80,
        },
        webp: {
          lossless: true,
        },
        avif: {
          lossless: true,
        },
      }),
      viteCompression({
        algorithm: 'brotliCompress',
        threshold: 10240, // 10kb
      }),
      chunkSplitPlugin({
        strategy: 'default',
        customSplitting: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-lib': ['framer-motion'],
        },
      }),
      legacy({
        targets: ['defaults', 'not IE 11'],
      }),
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
        },
      }),
      mkcert(),
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    ],

    // Configuration for build
    build: {
      sourcemap: true,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          assetFileNames: 'assets/[name].[hash].[ext]',
          chunkFileNames: 'assets/[name].[hash].js',
          entryFileNames: 'assets/[name].[hash].js',
        },
      },
      chunkSizeWarningLimit: 1000,
    },

    // Development server configuration
    server: {
      host: true,
      port: 5173,
      strictPort: true,
      https: true,
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        },
      },
    },

    // Preview server configuration
    preview: {
      port: 4173,
      host: true,
      strictPort: true,
    },

    // Resolve configuration
    resolve: {
      alias: {
        '@': '/src',
        '@assets': '/src/assets',
        '@components': '/src/components',
      },
    },

    // CSS configuration
    css: {
      devSourcemap: true,
      modules: {
        localsConvention: 'camelCaseOnly',
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`,
        },
      },
    },

    // OptimizeDeps configuration
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'framer-motion',
        '@emotion/react',
      ],
      exclude: ['js-big-decimal'],
    },
  };
});
