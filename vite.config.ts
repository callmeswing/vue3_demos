import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": "/src",
      "@cp": "/src/components",
      "@views": "/src/views",
      "@testBasic": "/src/components/basic",
      "@testAdvanced": "/src/components/advanced",
    },
  },
});
