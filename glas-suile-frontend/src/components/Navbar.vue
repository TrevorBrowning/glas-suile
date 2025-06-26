<template>
  <nav>
    <div v-if="!authStore.user">
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/register">Register</RouterLink>
    </div>
    <div v-else>
      <RouterLink to="/dashboard">Dashboard</RouterLink>
      <button @click="authStore.clearAuthData()">Sign Out</button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { RouterLink } from 'vue-router'
const authStore = useAuthStore()
</script>
