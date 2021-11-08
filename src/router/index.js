import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/home.vue'
import Login from '../views/login.vue'
// import AdminLayout from '../components/AdminLayout.vue'

const routes = [
  {
    path: '/',
    redirect: { name: 'Home' }
  },
  {
    path: '/login',
    component: Login  
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router