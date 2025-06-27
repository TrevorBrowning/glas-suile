<template>
  <div class="max-w-md mx-auto mt-10 p-8 border rounded-lg shadow-lg bg-white">
    <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">Login to Glas Suile</h1>
    <form @submit.prevent="handleLogin" class="space-y-6">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
        <input
          type="email"
          v-model="email"
          id="email"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
        <input
          type="password"
          v-model="password"
          id="password"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
        type="submit"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sign In
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { RouterLink, useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      authStore.setAuthData(data, data.token)
      router.push('/dashboard')
    } else {
      console.error('Login Failed:', data.message)
    }
  } catch (error) {
    console.error('An error occurred:', error)
  }
}
</script>
