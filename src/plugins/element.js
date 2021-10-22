import {
  ElButton,
  // ElSelect,
  // ElBreadcrumb,
  // ElBreadcrumbItem,
  // ElIcon,
  // ElDropdown,
  // ElDropdownMenu,
  // ElDropdownItem,
  // ElPopover,
  // ElMessage,
  ElForm,
  ElFormItem,
  // ElLoading,
  ElInput,
  // ElTooltip,
  // ElDialog,
  // ElScrollbar,
  // ElMenu,
  // ElMenuItem,
  // ElSubmenu
} from 'element-plus'

import 'element-plus/dist/index.css'

// const app = createApp()
// console.log(app,28)
const Element = {
  install: function(app) {
    app.use(ElButton)
    app.use(ElForm)
    app.use(ElFormItem)
    app.use(ElInput)
  }
}

export default Element
