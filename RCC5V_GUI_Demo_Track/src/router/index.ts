// ___________router/index.ts____________________2023-01-01_____
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import MainView from '../views/MainView.vue'
// import About from '../views/About.vue'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  //   meta: {
  //     title: 'haus3-Home'
  //   }
  // },
  {
    path: '/',
    name: 'MainView',
    component: MainView,
    meta: {
      title: 'RCC5V_GUI MainView',
    },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = <string> to.meta.title
  next()
})

export default router
