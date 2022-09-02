import {
  ElButton,
  // ElSelect,
  // ElBreadcrumb,
  // ElBreadcrumbItem,
  // ElIcon,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  // ElPopover,
  // ElMessage,
  ElForm,
  ElFormItem,
  // ElLoading,
  ElInput,
  // ElTooltip,
  // ElDialog,
  ElLink,
  ElScrollbar,
  ElMenu,
  ElMenuItem,
  ElSubMenu
} from 'element-plus'

import 'element-plus/dist/index.css'

// const app = createApp()
// console.log(app,28)
const Element = {
  install: function (app) {
    app.use(ElButton)
    app.use(ElForm)
    app.use(ElFormItem)
    app.use(ElInput)
    app.use(ElDropdown)
    app.use(ElDropdownMenu)
    app.use(ElDropdownItem)
    app.use(ElLink)
    app.use(ElScrollbar)
    app.use(ElMenu)
    app.use(ElMenuItem)
    app.use(ElSubMenu)
  }
}

export default Element
