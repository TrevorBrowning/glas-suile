import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/dashboardView.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/loginView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
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

router.beforeEach((to, from) => {
  const authStore = useAuthStore()

  if (to.name === 'home') {
    return authStore.token ? { name: 'dashboard' } : { name: 'login' }
  }

  if (to.meta.requiresAuth && !authStore.token) {
    return { name: 'login' }
  }
})

export default router
