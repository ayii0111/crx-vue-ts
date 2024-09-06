import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import copy from 'rollup-plugin-copy';
import { resolve } from 'path';
import { readdirSync, statSync } from 'fs';



const tsFilesInput = getAllTsFiles('scripts');


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    copy({
      targets: [
        { src: 'manifest.json', dest: 'dist' },  // 將 manifest.json 複製到 dist 目錄
      ],
      hook: 'writeBundle',  // 在打包完成後進行複製
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',  // 主要入口文件
        ...tsFilesInput,  // 動態添加 .ts 文件作為輸入
      },
      output: {
        dir: 'dist',  // 指定輸出目錄
        format: 'es',  // 使用 ES 模塊格式
        entryFileNames: '[name].js',  // 輸出的 JavaScript 文件名格式
      },
    },
  },
  base: './', // 設定為相對路徑，確保資源加載使用相對路徑
})


// 函數：遞迴遍歷目錄以獲取所有 .ts 檔案
function getAllTsFiles(dir: string): Record<string, string> {
  const files = readdirSync(dir);
  const entries: Record<string, string> = {};

  files.forEach((file) => {
    const fullPath = resolve(dir, file);
    const fileStat = statSync(fullPath);

    if (fileStat.isDirectory()) {
      // 如果是子目錄，遞迴調用
      Object.assign(entries, getAllTsFiles(fullPath));
    } else if (file.endsWith('.ts')) {
      // 如果是 .ts 文件，將其添加到輸入中
      const entryName = fullPath.replace(/^.*[\\/]/, '').replace(/\.ts$/, ''); // 生成鍵名
      entries[entryName] = fullPath;
    }
  });

  return entries;
}