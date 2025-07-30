import type { Config } from "@react-router/dev/config";
import { vercelPreset } from '@vercel/react-router/vite';
export default {
  appDirectory: "app",
  ssr: false,
  presets: [vercelPreset()]
} satisfies Config;
