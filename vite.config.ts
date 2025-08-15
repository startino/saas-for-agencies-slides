import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte()],
  base: "./",
  server: {
    watch: {
      usePolling: true, // Enable polling for bind mounts
      interval: 300, // Poll more frequently (300ms)
      ignored: ["!**/node_modules/**"],
    },
  },
});
