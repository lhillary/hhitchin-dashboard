import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Messages from '../views/Messages.vue'
import Table from '../views/Table.vue'
import Login from '../views/Login.vue'
import { authGuard } from "../auth/authGuard";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: authGuard
  },
  {
    path: '/messages',
    name: 'Messages',
    component: Messages,
    beforeEnter: authGuard
  },
  {
    path: '/table',
    name: 'Table',
    component: Table,
    beforeEnter: authGuard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
