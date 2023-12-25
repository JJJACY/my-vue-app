import {
  ElButton,
  // ElSelect,
  // ElBreadcrumb,
  // ElBreadcrumbItem,
  ElIcon,
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
  ElSubMenu,
  ElColorPicker,
} from 'element-plus'
import { App } from 'vue'
import 'element-plus/dist/index.css'

const Element = {
  install: function (app: App<Element>) {
    app.use(ElButton)
    app.use(ElIcon)
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
    app.use(ElColorPicker)
  }
}

export default Element
