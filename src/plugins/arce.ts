import {
  Button,
  Form,
  // Formitem,
  Input,
  Checkbox
} from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import { App } from 'vue'

const Arco = {
  install (Vue: App<Element>) {
    Vue.use(Button)
    Vue.use(Form)
    // Vue.use(Formitem)
    Vue.use(Input)
    Vue.use(Checkbox)
  }
}

export default Arco
