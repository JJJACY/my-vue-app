import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

import Element from './plugins/element'

const app = createApp(App)

app.use(router)
app.use(Element)
app.mount('#app')
