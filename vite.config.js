import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
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