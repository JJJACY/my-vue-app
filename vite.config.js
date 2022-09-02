import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import viteCompression from "vite-plugin-compression";
import importToCDN from "vite-plugin-cdn-import";
import eslintPlugin from 'vite-plugin-eslint'
import { svgBuilder } from "./src/plugins/iconSvg/index";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      comp: resolve(__dirname, "src/components"),
      "@": resolve(__dirname, "src"),
      images: "./src/assets/images", //配置静态资源路径
    },
  },
  build: {
    // minify: "terser",
    // 取消计算文件大小，加快打包速度
    reportCompressedSize: false,
    sourcemap: true,
    terserOptions: {
      compress: {
        //生产环境移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      //打包输出文件设置
      chunkFileNames: "js/[name]-[hash].js",
      entryFileNames: "js/[name]-[hash].js",
      assetFileNames: "[ext]/[name]-[hash].[ext]",
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          themeColor: "#a0a184",
        },
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    vue(),
    svgBuilder("./src/plugins/iconSvg/svg/"),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/plugins/iconSvg/svg')],
      // icon symbolId
      // default
      symbolId: 'icon-[dir]-[name]',
    }),
    vueI18n({
      // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
      compositionOnly: false,
      runtimeOnly: true,
      // you need to set i18n resource including paths !
      include: [resolve(__dirname, './src/locales/')],
    }),
    viteCompression({
      //生成压缩包gz
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
    importToCDN({
      modules: [
        // {
        //   name: "vue",
        //   var: "Vue",
        //   path: "https://unpkg.com/vue@next",
        // },
        // {
        //   name: "element-plus",
        //   var: "ElementPlus",
        //   path: `https://unpkg.com/element-plus`,
        //   css: "https://unpkg.com/element-plus/dist/index.css",
        // },
      ],
    }),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    })
  ],
});

// export default defineConfig(({ command, mode }) => {
//   if (command === 'serve') {
//     return {
//       // serve 独有配置
//     }
//   } else {
//     return {
//       // build 独有配置
//     }
//   }
// })
