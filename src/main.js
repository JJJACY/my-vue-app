import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

import Element from './plugins/element'
import IconSvg from './plugins/svg/index.vue'

import Arco  from './plugins/arce'

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

const app = createApp(App)
app.component('svg-icon',IconSvg)

app.use(router)
app.use(Element)
app.use(Arco)
// app.config.globalProperties.$echarts = echarts //绑定实例

app.mount('#app')
