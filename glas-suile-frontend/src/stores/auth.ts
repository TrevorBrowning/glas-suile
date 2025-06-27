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
    localStorage.setItem('userData', JSON.stringify(newUserData))
    localStorage.setItem('userToken', newAuthToken)
  }

  function clearAuthData() {
    user.value = null
    token.value = null
    localStorage.removeItem('userData')
    localStorage.removeItem('userToken')
  }

  function tryLoadFromLocalStorage() {
    const userDataString = localStorage.getItem('userData')
    const userTokenString = localStorage.getItem('userToken')

    if (userDataString && userTokenString) {
      try {
        const parsedUser = JSON.parse(userDataString)
        user.value = parsedUser
        token.value = userTokenString
      } catch (error) {
        console.error('Failed to parse user data from localStorage', error)
        clearAuthData()
      }
    }
  }

  tryLoadFromLocalStorage()

  return { user, token, setAuthData, clearAuthData }
})
