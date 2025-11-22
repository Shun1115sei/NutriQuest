import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    reactRouter(),
    tailwindcss(),
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
    outDir: 'dist'
  }
});
