import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Production optimizations
    // - Minification is enabled by default in Vite
    // - Tree shaking is automatic
    // - Code splitting via manualChunks below
    minify: 'esbuild', // Fast and efficient minification
    sourcemap: false, // Disable sourcemaps in production for smaller bundle
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-label', '@radix-ui/react-slider', '@radix-ui/react-slot', '@radix-ui/react-toast'],
          'utils-vendor': ['clsx', 'tailwind-merge', 'class-variance-authority'],
        },
        // Optimize chunk file names for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 1000,
    // Enable compression (should be handled by server/CDN)
    // For static hosting, ensure gzip/brotli compression is enabled
  },
});
