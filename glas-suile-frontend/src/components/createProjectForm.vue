<template>
  <div class="mb-10 bg-white p-6 rounded-lg shadow-md border border-gray-200">
    <h2 class="text-xl font-semibold mb-4 text-gray-800">Create a New Project</h2>

    <div
      v-if="errorMessage"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
      role="alert"
    >
      <span class="block sm:inline">{{ errorMessage }}</span>
    </div>

    <form @submit.prevent="handleCreateProject" class="space-y-4">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          v-model="newTitle"
          placeholder="Enter project title..."
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <input
          type="text"
          id="description"
          v-model="newDescription"
          placeholder="Enter project description..."
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
        type="submit"
        :disabled="isLoading"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        <span v-if="isLoading">Creating...</span>
        <span v-else>Add New Project</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits(['projectCreated'])

const newTitle = ref('')
const newDescription = ref('')
const errorMessage = ref<string | null>(null)
const isLoading = ref(false)

const authStore = useAuthStore()

const handleCreateProject = async () => {
  if (!newTitle.value || !newDescription.value) {
    errorMessage.value = 'Please fill out both title and description.'
    return
  }

  isLoading.value = true
  errorMessage.value = null
  try {
    const response = await fetch('http://localhost:5000/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.token}`,
      },
      body: JSON.stringify({
        title: newTitle.value,
        description: newDescription.value,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      emit('projectCreated', data)

      newTitle.value = ''
      newDescription.value = ''
    } else {
      errorMessage.value = data.message || 'Failed to create project.'
    }
  } catch (error) {
    errorMessage.value = 'An unexpected error occurred.'
  } finally {
    isLoading.value = false
  }
}
</script>
