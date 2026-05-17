import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// In dev: proxy /api -> Vercel server so all requests are same-origin (no CORS).
// In prod: the firebase origin is already on the server's allow-list.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const target =
    env.VITE_API_BASE || "https://assignment-11-server-psi-cyan.vercel.app";

  return {
    plugins: [react()],
    server: {
      host: "localhost",
      port: 5173,
      strictPort: false,
      proxy: {
        "/api": {
          target,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
