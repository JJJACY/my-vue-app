import {
  Button,
  Form,
  // Formitem,
  Input,
  Checkbox
} from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'

const Arco = {
  install (Vue) {
    Vue.use(Button)
    Vue.use(Form)
    // Vue.use(Formitem)
    Vue.use(Input)
    Vue.use(Checkbox)
  }
}

export default Arco
