import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";

import Element from "./plugins/element";
import Arco from "./plugins/arce";
import { createPinia } from "pinia";

// import IconSvg from './plugins/iconSvg/index.vue'
import IconSvg from "./components/Svg/index.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
// import { Search, Timer, Edit } from "@element-plus/icons-vue";

import i18n from "./locales/index";

// import * as echarts from 'echarts'
// import china from '../public/china.json'
// import tw from '../public/tw.json'
// echarts.registerMap('tw',tw)

// import axios from 'axios'

// axios.get('/tw.json').then(res=>{
//   let tw = JSON.stringify(res.data)
//   echarts.registerMap('tw',tw)
// })

// echarts.registerMap('china',china)
import "virtual:svg-icons-register";
import allKeys from 'virtual:svg-icons-names'
// console.log(allKeys)

const app = createApp(App);
const pinia = createPinia();

// app.component("Timer", Timer);
// app.component("Edit", Edit);
// app.component("Search", Search)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app
  .use(router)
  .use(pinia)
  .use(Element)
  .use(Arco)
  .use(i18n)
  .component("icon-svg", IconSvg)
  // app.config.globalProperties.$echarts = echarts //绑定实例
  .mount("#app");
