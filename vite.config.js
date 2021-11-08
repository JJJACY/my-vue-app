import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
        less: {
        modifyVars: {
          'arcoblue-6': '#a0a184',
        },
        javascriptEnabled: true,
      }
    }
  },
  plugins: [
    {
      ...vue(),
    }
  ]
})


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