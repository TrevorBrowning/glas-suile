<template>
  <div class="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
    <div class="text-center mb-10">
      <h1 class="text-3xl font-bold text-gray-900">Your Dashboard</h1>
      <p class="mt-2 text-lg text-gray-600">Welcome back! Here are your projects.</p>
    </div>

    <CreateProjectForm @projectCreated="addProjectToList" />

    <div>
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Your Projects</h2>

      <div
        v-if="errorMessage"
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
        role="alert"
      >
        <span class="block sm:inline">{{ errorMessage }}</span>
      </div>

      <div v-if="isLoading" class="text-center text-gray-500 py-10">Loading projects...</div>

      <ProjectList
        v-else
        :projects="projects"
        @deleteProject="removeProjectFromList"
        @updateProject="updateProjectInList"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import CreateProjectForm from '@/components/createProjectForm.vue'
import ProjectList from '@/components/projectList.vue'

interface Project {
  _id: string
  title: string
  description: string
}

const errorMessage = ref<string | null>(null)
const isLoading = ref(false)
const projects = ref<Project[]>([])
const authStore = useAuthStore()

const addProjectToList = (newProject: Project) => {
  projects.value.push(newProject)
}

const removeProjectFromList = (projectId: string) => {
  projects.value = projects.value.filter((p) => p._id !== projectId)
}

const updateProjectInList = (updatedProject: Project) => {
  const index = projects.value.findIndex((p) => p._id === updatedProject._id)
  if (index !== -1) {
    projects.value[index] = updatedProject
  }
}

onMounted(async () => {
  isLoading.value = true
  errorMessage.value = null
  try {
    const response = await fetch('http://localhost:5000/api/projects', {
      method: 'GET',
      headers: { Authorization: `Bearer ${authStore.token}` },
    })
    if (response.ok) {
      projects.value = await response.json()
    } else {
      const errorData = await response.json()
      errorMessage.value = errorData.message || 'Failed to fetch projects.'
    }
  } catch (error) {
    errorMessage.value = 'An unexpected error occurred while fetching projects.'
  } finally {
    isLoading.value = false
  }
})
</script>
