import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => {return import(/* webpackChunkName: "home" */ '../views/Home.vue')}
  },
  {
    path: '/login',
    name: 'Login',
    component: () => {return import(/* webpackChunkName: "login" */ '../views/Login.vue')}
  },
  {
    path: '/users',
    name: 'Users',
    component: () => {return import(/* webpackChunkName: "users" */ '../views/Users.vue')}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
