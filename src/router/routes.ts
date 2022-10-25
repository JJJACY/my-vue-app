/*
 * @Author: JJJACY 49667416+JJJACY@users.noreply.github.com
 * @Date: 2022-08-16 14:19:33
 * @LastEditors: JJJACY 49667416+JJJACY@users.noreply.github.com
 * @LastEditTime: 2022-09-14 16:38:26
 * @FilePath: /my-vue-app/src/router/routes.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import AdminLayout from 'comp/AdminLayout.vue'
const dashBoard = () => import('@/views/dashboard.vue')
const Home = () => import('@/views/home.vue')
const Login = () => import('@/views/login.vue')
const Error = () => import('@/views/error404.vue')

import routesDetailManagement from './routesDetailManagement'

const routes = [
  {
    path: '/',
    redirect: { name: "home" },
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
      ...routesDetailManagement,
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/404',
    name: 'Error',
    component: Error,
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Error' },
  },
]

export default routes
