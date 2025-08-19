import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      name: 'dashboard-static-redirect',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/' || req.url === '/dashboard/') {
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
