import { defineConfig } from 'vite';
import react from "@vitejs/plugin-react"

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [
    react(), // use only the React plugin, no react-router plugin

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
    outDir: 'dist/dashboard',
    rollupOptions: {
      input: 'app/dashboard/entry.tsx'
    }
  }
});
