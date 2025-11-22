import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    {
      name: 'dashboard-static-redirect',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/dashboard/') {
            req.url = '/dashboard/index.html';
          }
          next();
        });
      }
    }],
  build: {
    outDir: 'dist',
    cssCodeSplit: false,

    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'assets/globals.css'; // fixed name & path
          }
          return assetInfo.name || '';
        },
      },
    },
  }
});
