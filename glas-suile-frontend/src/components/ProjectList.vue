<template>
  <div class="space-y-4">
    <ProjectItem
      v-for="project in projects"
      :key="project._id"
      :project="project"
      @projectDeleted="handleProjectDeleted"
      @projectUpdated="handleProjectUpdated"
    />

    <div v-if="projects.length === 0" class="text-center text-gray-500 py-10">
      You don't have any projects yet. Use the form above to create one!
    </div>
  </div>
</template>

<script setup lang="ts">
import ProjectItem from './ProjectItem.vue'

interface Project {
  _id: string
  title: string
  description: string
}

defineProps<{
  projects: Project[]
}>()

const emit = defineEmits(['deleteProject', 'updateProject'])

const handleProjectDeleted = (projectId: string) => {
  emit('deleteProject', projectId)
}

const handleProjectUpdated = (updatedProject: Project) => {
  emit('updateProject', updatedProject)
}
</script>
