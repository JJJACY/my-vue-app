/*
 * @Author: JJJACY 49667416+JJJACY@users.noreply.github.com
 * @Date: 2022-09-14 09:56:59
 * @LastEditors: JJJACY 49667416+JJJACY@users.noreply.github.com
 * @LastEditTime: 2022-09-14 15:45:34
 * @FilePath: /my-vue-app/src/router/routesDetailManagement.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { h, resolveComponent} from "vue";
const twDetailManagement2 = () => import('@/views/twDetailManagement_2.vue')
const twDetailManagementChild = () => import('@/views/twDetailManagementChild.vue')

// const RouteView = {
//   render: () => h(resolveComponent('router-view')),
// };
// 而父路由又只有个router-view的页面；通过这个方式可以不用写那个index.vue文件，也不用在router中引入；

export default [ 
  {
    path: "twdetail",
    name: 'twDetail',
    component: {
      render: () => h(resolveComponent('router-view')),
    },
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
    },
    children: [
      {
        path: "management",
        name: "twDetailManagement",
        component: {
          render: () => h(resolveComponent('router-view')),
        },
        permission: 2,
        meta: {
          title: '后台管理-z细节管理',
          nav: {
            title: 'z细节管理',
            // svg: {
            //   class: 'svg-icon-role',
            //   name: 'role'
            // }
          }
        },
        children: [
          {
            path: "children",
            name: "twDetailManagementChild",
            component: twDetailManagementChild,
            permission: 1,
            meta: {
              title: '管理-孙细节管理',
              nav: {
                title: '孙细节管理',
              }
            }
          }
        ]
      },
      {
        path: "management2",
        name: "twDetailManagement2",
        component: twDetailManagement2,
        permission: 2,
        meta: {
          title: '后台管理-z2细节管理',
          nav: {
            title: 'z2细节管理',
            // svg: {
            //   class: 'svg-icon-role',
            //   name: 'role'
            // }
          }
        }
      }
    ]
  }
]

