<template>
  <div class="bg-white p-5 rounded-lg shadow border border-gray-200">
    <div
      v-if="errorMessage"
      class="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md mb-4"
      role="alert"
    >
      <p>{{ errorMessage }}</p>
    </div>

    <div v-if="!isEditing">
      <h3 class="font-bold text-lg text-gray-900">{{ props.project.title }}</h3>
      <p class="text-gray-600 mt-1">{{ props.project.description }}</p>
      <div class="mt-4 space-x-2">
        <button
          @click="enterEditMode"
          class="text-sm font-medium text-indigo-600 hover:text-indigo-800"
          :disabled="isLoading"
        >
          Edit
        </button>
        <button
          @click="handleDelete"
          class="text-sm font-medium text-red-600 hover:text-red-800"
          :disabled="isLoading"
        >
          <span v-if="isLoading">Deleting...</span>
          <span v-else>Delete</span>
        </button>
      </div>
    </div>

    <div v-else>
      <form @submit.prevent="handleUpdate" class="space-y-3">
        <input
          type="text"
          v-model="editTitle"
          class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
        <input
          type="text"
          v-model="editDescription"
          class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
        <div class="mt-4 space-x-2">
          <button
            type="submit"
            class="text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-3 py-1 rounded-md"
            :disabled="isLoading"
          >
            <span v-if="isLoading">Saving...</span>
            <span v-else>Save</span>
          </button>
          <button
            type="button"
            @click="isEditing = false"
            class="text-sm font-medium text-gray-700 hover:bg-gray-100 px-3 py-1 rounded-md border"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

interface Project {
  _id: string
  title: string
  description: string
}

const props = defineProps<{
  project: Project
}>()

const emit = defineEmits(['projectDeleted', 'projectUpdated'])

const authStore = useAuthStore()

const isEditing = ref(false)
const editTitle = ref('')
const editDescription = ref('')
const errorMessage = ref<string | null>(null)
const isLoading = ref(false)

const enterEditMode = () => {
  isEditing.value = true
  editTitle.value = props.project.title
  editDescription.value = props.project.description
}

const handleUpdate = async () => {
  isLoading.value = true
  errorMessage.value = null
  try {
    const response = await fetch(`http://localhost:5000/api/projects/${props.project._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.token}`,
      },
      body: JSON.stringify({
        title: editTitle.value,
        description: editDescription.value,
      }),
    })

    const updatedProject = await response.json()
    if (response.ok) {
      emit('projectUpdated', updatedProject)
      isEditing.value = false
    } else {
      errorMessage.value = updatedProject.message || 'Failed to update.'
    }
  } catch (error) {
    errorMessage.value = 'An error occurred while updating.'
  } finally {
    isLoading.value = false
  }
}

const handleDelete = async () => {
  if (!confirm('Are you sure you want to delete this project?')) return

  isLoading.value = true
  errorMessage.value = null
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/projects/${props.project._id}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authStore.token}` },
      },
    )

    if (response.ok) {
      emit('projectDeleted', props.project._id)
    } else {
      const errorData = await response.json()
      errorMessage.value = errorData.message || 'Failed to delete.'
    }
  } catch (error) {
    errorMessage.value = 'An error occurred while deleting.'
  } finally {
    isLoading.value = false
  }
}
</script>
