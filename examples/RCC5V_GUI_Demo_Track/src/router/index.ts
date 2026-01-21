// ___________router/index.ts____________________2026-01-21_____
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import MainView from '../views/MainView.vue'
// import About from '../views/About.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'MainView',
    component: MainView,
    meta: {
      title: 'RCC5V_GUI_Demo_Track MainView',
    },
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      title: 'About RCC5V_GUI_Demo_Track About',
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) ?? 'RCC5V_GUI_Demo_Track1'
  next()
})

export default router
