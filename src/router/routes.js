import AdminLayout from 'comp/AdminLayout.vue'
const dashBoard = () => import('@/views/dashboard.vue')
const Home = () => import('@/views/home.vue')
const Login = () => import('@/views/login.vue')
const twDetail = () => import('@/views/twDetail.vue')

const routes = [
  {
    path: '/',
    // redirect: { name: "home" },
    component: AdminLayout,
    children: [
      {
        path: 'dashboard',
        name: 'dashBoard',
        component: dashBoard,
        permission: 0,
        meta: {
          title: '后台管理-控制台',
          nav: {
            title: '控制台',
            svg: {
              class: 'svg-icon-dashboard',
              name: 'dashboard'
            }
          }
        }
      },
      {
        path: 'home',
        name: 'home',
        component: Home,
        permission: 2,
        meta: {
          title: '后台管理-首页',
          nav: {
            title: '首页',
            icon: 'home-filled',
            class: 'svg-icon-homefilled'
          }
        }
      },
      {
        path: 'twdetail',
        name: 'Twdetail',
        component: twDetail,
        permission: 1,
        meta: {
          title: '后台管理-细节管理',
          nav: {
            title: '细节管理',
            svg: {
              class: 'svg-icon-menu',
              name: 'menu'
            }
          }
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

export default routes
