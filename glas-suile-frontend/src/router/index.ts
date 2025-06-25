import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/dashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/loginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/registerView.vue'),
    },
  ],
})

export default router
