import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setup-tests.ts",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
  },
  resolve: { alias: { "~": path.resolve(__dirname, "./src") } },
});
