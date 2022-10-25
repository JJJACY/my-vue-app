<script setup>
import { computed, ref, reactive, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'
import routesAll from '../router/routes'
import screenfull from 'screenfull'
import { setLocale } from "@/locales/index";
import { Message } from '@arco-design/web-vue'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()

const user = useUserStore()
const router = useRouter()
const navBackgroundColor = ref('#141f29')
const navActiveTextColor = ref('white')
const navTextColor = ref('#989898')
const textColor = ref('#EEE')
const activeTextColor = ref('#0FC700')
const collapse = ref(false)
const isFullscreen = ref(false)
const supportedLangs = reactive({
  langs: ["en-US", "zh-CN", "fr-FR"]
})
const langs = reactive({
  data: {
    "en-US": "English",
    "zh-CN": "中文",
    "fr-FR": "Français"
  }
})

const defaultActive = router.currentRoute.value.name
let menuRoutes = []


const userName = user.name
const userAvatar = new URL('../assets/images/default-avatar.png', import.meta.url).href

const siderWidth = computed(() => {
  return collapse.value ? '64px' : '230px'
})

const getRoutes = () => {
  const resultRoutes = filterPermissionRoutes(
    routesAll,
    user.perimssion
  )
  menuRoutes = filterRoutes(resultRoutes)
  console.log(menuRoutes,49)
}

const filterPermissionRoutes = (routes, permissions) => {
  const filterRoutes = []
  routes.forEach(data => {
    const route = { ...data }
    const notPermission = !route.permission
    const hasPermission = permissions.includes(route.permission)
    const passPermission = notPermission || hasPermission
    let hasPath = true
    if (route.children) {
      route.children = filterPermissionRoutes(
        data.children,
        permissions
      )
      if (route.children.length === 0) {
        hasPath = false
      }
    }
    if (passPermission && hasPath) {
      filterRoutes.push(route)
    }
  })
  return filterRoutes
}

const filterRoutes = (routes) => {
  const result = []
  routes.forEach(data => {
    if (data.meta && data.meta.nav) {
      const item = {
        name: data.name,
        meta: data.meta
      }
      if (data.children) {
        item.children = filterRoutes(data.children)
      }
      result.push(item)
    } else if (data.children) {
      filterRoutes(data.children).forEach(item => {
        result.push(item)
      })
    }
  })
  return result
}

const haveChildren = (route) => {
  const children = route.children || []
  return children.length
}

const handleCollapse = () => {
  collapse.value = !collapse.value
}

const handleCommand = (command) => {
  if (typeof command === 'handleLogout') handleLogout()
  else changeLocale(command);
}

const toggleScreenfull = () => {
  if (!screenfull.isEnabled) {
    Message.warning('warning.browser')
    return
  }
  screenfull.toggle()
}

const changeLocale = lang => {
  locale.value = lang
  setLocale(lang)
}

const getIsFullscreen = () => {
  isFullscreen.value = screenfull.isFullscreen
}

const handleLogout = () => {
  user.logout()
  router.push({ path: '/login' })
}

getRoutes()

if (screenfull.isEnabled) {
  screenfull.on('change', getIsFullscreen)
}

onUnmounted(() => {
  if (screenfull.isEnabled) {
    screenfull.off('change', getIsFullscreen)
  }
})

defineExpose({
  navBackgroundColor,
  navActiveTextColor,
  navTextColor,
  textColor,
  activeTextColor,
  collapse,
  isFullscreen,
  supportedLangs,
  langs,
  defaultActive,
  menuRoutes,
  userName,
  userAvatar,
  siderWidth,
  
  getRoutes,
  filterPermissionRoutes,
  filterRoutes,
  haveChildren,
  handleCollapse,
  handleCommand,
  toggleScreenfull,
  changeLocale,
  getIsFullscreen,
  handleLogout
})
</script>

<template>
  <div class="page">
    <div class="page-left-container" :style="[{ width: siderWidth, backgroundColor: navBackgroundColor }]">
      <div class="page-sidebar">
        <div class="sidebar-header">
          <img
            class="sidebar-header-logo" :style="collapse ? 'margin-left: 16px' : 'margin-left: 20px'"
            src="../assets/images/logo.png">
          <span v-show="!collapse" class="sidebar-header-text">{{
            $t("common.brand")
          }}</span>
        </div>
        <div class="sidebar-body">
          <el-scrollbar class="scrollbar-section">
            <el-menu
              class="el-menu-noborder"
              :background-color="navBackgroundColor"
              :text-color="navTextColor"
              :active-text-color="navActiveTextColor"
              :default-active="$route.name"
              :router="true"
              :collapse="collapse">
              <template v-for="route in menuRoutes">
                <el-menu-item
                  v-if="!haveChildren(route)" :key="route.name" :index="route.name"
                  :route="{ name: route.name }">
                  <el-icon v-if="route.meta.nav.icon">
                    <component :is="route.meta.nav.icon" class="com-de" />
                  </el-icon>
                  <icon-svg
                    v-if="route.meta.nav.svg"
                    :class-name="route.meta.nav.svg.class"
                    :name="route.meta.nav.svg.name"
                    :style="{ marginRight : collapse ? '0' : '5px' }"
                  />
                  <template #title>{{ route.meta.nav.title }}</template>
                </el-menu-item>
                <el-sub-menu v-else :key="route.name + ''" class="el-submenu-level_1" :index="route.name">
                  <template #title>
                    <el-icon v-if="route.meta.nav.icon">
                      <component :is="route.meta.nav.icon" />
                    </el-icon>
                    <icon-svg
                      v-if="route.meta.nav.svg"
                      :class-name="route.meta.nav.svg.class"
                      :name="route.meta.nav.svg.name"
                    />
                    <span>{{ route.meta.nav.title }}</span>
                  </template>
                  <template v-for="item in route.children">
                    <el-menu-item
                      v-if="!haveChildren(item)" :key="item.name" :index="item.name"
                      :route="{ name: item.name }">
                      <el-icon v-if="item.meta.nav.icon">
                        <component :is="item.meta.nav.icon" />
                      </el-icon>
                      <icon-svg
                        v-if="item.meta.nav.svg"
                        :class-name="item.meta.nav.svg.class"
                        :name="item.meta.nav.svg.name"
                      />
                      <span>{{ item.meta.nav.title }}222</span>
                    </el-menu-item>
                    <el-sub-menu v-else :key="item.name + ''" class="el-submenu-level_2" :index="item.name">
                      <template #title>
                        <el-icon v-if="route.meta.nav.icon">
                          <component :is="route.meta.nav.icon" />
                        </el-icon>
                        <icon-svg
                          v-else-if="item.meta.nav.svg" :class-name="item.meta.nav.svg.class" 
                          :name="item.meta.nav.svg.name" />
                        <span v-else class="fa-diamond" />
                        <span>{{ item.meta.nav.title }}</span>
                      </template>
                      <el-menu-item
                        v-for="data in item.children" :key="data.name" :index="data.name"
                        :route="{ name: data.name }">
                        <span class="fa-dot" />
                        <span>{{ data.meta.nav.title }}111</span>
                      </el-menu-item>
                    </el-sub-menu>
                  </template>
                </el-sub-menu>
              </template>
            </el-menu>
          </el-scrollbar>
        </div>
        <div class="sidebar-footer">
          <div class="collapse-icon-container" @click="handleCollapse">
            <icon-svg
              :class-name="collapse ? 'collapse-icon unfold' : 'collapse-icon'"
              name="fold_1"
              color="#ffffff"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="page-right-container">
      <div class="page-header">
        <div class="page-header-left">
          <div class="fullscreen-icon-container" @click="toggleScreenfull">
            <icon-svg
              class-name="fullscreen-icon" :name="
                isFullscreen
                  ? 'fullscreen-shrink-round'
                  : 'fullscreen-expand-round'
              " />
          </div>
        </div>
        <div class="page-header-middle">
          <!-- <el-link type="primary" :underline="false" @click="goLxp"></el-link> -->
        </div>
        <div class="page-header-right">
          <el-dropdown style="height: 100%" @command="handleCommand">
            <div class="language-icon-container">
              <icon-svg
                class-name="svg-icon-language"
                name="language"
              />
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="(lang, index) in supportedLangs.langs"
                  :key="index"
                  :command="lang"
                  :disabled="$i18n.locale === lang ? true : false"
                >
                  {{ langs.data[lang] }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-dropdown style="height: 100%" @command="handleCommand">
            <div class="user-info">
              <img v-if="userAvatar" class="user-avatar" :src="userAvatar">
              <img v-else class="user-avatar" src="../assets/images/default-avatar.png">
              <span class="user-name">{{ userName || userPhone }}</span>
              <el-icon><ArrowDownBold /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item icon="el-icon-video-pause" command="handleLogout">{{ $t("common.logout") }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="page-content">
        <el-scrollbar class="scrollbar-section">
          <router-view />
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.svg-icon  {
  margin-right: 5px;
  width: 24px;
  height: 18px;
  vertical-align: middle;
}

.com-de {
  width: 24px;
  height: 18px;
  vertical-align: middle;
}

.page {
  height: 100vh;
  display: flex;

  .page-left-container {
    z-index: 101;
    flex: none;
    display: flex;
    flex-direction: column;
    width: 246px;
    transition: all 0.2s ease-out;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);

    .page-sidebar {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .sidebar-header {
        display: flex;
        align-items: center;
        height: 48px;

        .sidebar-header-logo {
          margin: 8px 8px 8px 20px;
          height: 32px;
          transition: all 0.2s linear;
        }

        .sidebar-header-text {
          flex: none;
          font-size: 20px;
          font-weight: 500;
          color: #fff;
        }
      }

      .sidebar-body {
        flex: 1;
        height: 0;
        overflow: auto;

        .el-menu-noborder {
          border-right: none;
        }

        .el-menu-noborder:not(.el-menu--collapse) {
          width: 230px !important;
          height: 100%;
        }
        // .el-menu-item:hover{
        //   color: #fff;
        // }

        // .el-menu-item:hover i{
        //   color: #fff;
        // }
      }

      .sidebar-footer {
        flex: none;
        padding: 8px;
        height: 48px;
        background: #141f29;
        overflow: hidden;
        box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);

        .collapse-icon-container {
          height: 32px;
          text-align: center;
          background-color: #1d2b3a;
          border-radius: 3px;
          cursor: pointer;

          &:hover {
            background-color: #273849;
          }

          .collapse-icon {
            margin-top: 6px;
            width: 20px;
            height: 20px;
            color: #fff;
            transition: all 0.2s ease-out;

            &.unfold {
              transform: rotate(-180deg);
            }
          }
        }
      }
    }
  }

  .page-right-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 1000px;
    overflow: hidden;

    .page-header {
      z-index: 100;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      height: 48px;
      font-size: 12px;
      line-height: 48px;
      font-weight: 400;
      color: #606266;
      background: #fff;
      box-shadow: 0 1px 2px 0 rgba(9, 18, 26, 0.06),
        0 4px 8px 0 rgba(39, 56, 73, 0.08);

      .page-header-left {
        .fullscreen-icon-container {
          padding: 0 10px;
          width: 36px;
          height: 100%;
          cursor: pointer;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }

          .fullscreen-icon {
            width: 24px;
            height: 100%;
          }
        }
      }

      .page-header-right {
        display: flex;

        .language-icon-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 10px;
          width: 38px;
          height: 100%;
          cursor: pointer;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }

          .svg-icon-language {
            margin: 0;
            width: 24px;
            height: 100%;
          }
        }

        .user-info {
          display: flex;
          align-items: center;
          padding: 0 10px;
          height: 100%;
          transition: all 0.2s ease;
          cursor: pointer;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }

          .user-avatar {
            margin: 0 8px;
            width: 30px;
            height: 30px;
            object-fit: cover;
            border-radius: 50%;
          }

          .user-name {
            margin-right: 8px;
            font-size: 13px;
            vertical-align: middle;
          }
        }
      }
    }

    .page-content {
      position: relative;
      flex: 1;
      overflow-y: auto;
      background: #f0f2f5;
    }
    
    :deep(.el-scrollbar__view) {
      height: 100% !important;
    }

  }
}
</style>
