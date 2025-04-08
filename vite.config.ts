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
  //  以下build方式是为了更好阅读，仅限于开发阶段
  build: {
    target: "esnext", // 保留原生语法（避免降级成 ES5）
    minify: false, // 禁用压缩
    sourcemap: true, // 生成 .map 文件
    rollupOptions: {
      treeshake: false, // 禁用 tree-shaking
      preserveEntrySignatures: "exports-only",
      output: {
        preserveModules: true, // 保留模块结构（每个文件一个模块）
        preserveModulesRoot: "src", // 保留 src 目录结构
        entryFileNames: "[name].js", // 禁用 hash 文件名
        chunkFileNames: "[name].js",
        format: "es", // ES module 输出
      },
    },
  },
});
