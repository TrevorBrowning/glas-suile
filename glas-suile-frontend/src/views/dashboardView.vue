<template>
  <div class="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
    <div class="text-center mb-10">
      <h1 class="text-3xl font-bold text-gray-900">Your Dashboard</h1>
      <p class="mt-2 text-lg text-gray-600">Welcome back! Here are your projects.</p>
    </div>

    <div class="mb-10 bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Create a New Project</h2>
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
          <label for="description" class="block text-sm font-medium text-gray-700"
            >Description</label
          >
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
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add New Project
        </button>
      </form>
    </div>

    <div>
      <h2 class="text-xl font-semibold mb-4 text-gray-800">Your Projects</h2>

      <div class="space-y-4">
        <div
          v-for="project in projects"
          :key="project._id"
          class="bg-white p-5 rounded-lg shadow border border-gray-200"
        >
          <h3 class="font-bold text-lg text-gray-900">{{ project.title }}</h3>
          <p class="text-gray-600 mt-1">{{ project.description }}</p>
        </div>

        <div v-if="projects.length === 0" class="text-center text-gray-500 py-10">
          You don't have any projects yet. Use the form above to create one!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

interface Project {
  _id: string
  title: string
  description: string
}

const newTitle = ref('')
const newDescription = ref('')

const authStore = useAuthStore()
const projects = ref<Project[]>([])
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:5000/api/projects', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    if (response.ok) {
      const data = await response.json()
      projects.value = data
    } else {
      const errorData = await response.json()
      console.error('Failed to fetch projects:', errorData.message)
    }
  } catch (error) {
    console.error('An error occurred while fetching projects:', error)
  }
})

const handleCreateProject = async () => {
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

    if (response.ok) {
      const newProject = await response.json()
      projects.value.push(newProject)
      console.log('Project created!', newProject)

      newTitle.value = ''
      newDescription.value = ''
    } else {
      const errorData = await response.json()
      console.error('Failed to create project:', errorData.message)
    }
  } catch (error) {
    console.error('An error occurred:', error)
  }
}
</script>
