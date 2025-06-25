import { defineStore } from 'pinia'
import { ref } from 'vue'
type User = {
  _id: string
  name: string
  email: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  function setAuthData(newUserData: User, newAuthToken: string) {
    user.value = newUserData
    token.value = newAuthToken
  }
  function clearAuthData() {
    user.value = null
    token.value = null
  }
  return { user, token, setAuthData, clearAuthData }
})
