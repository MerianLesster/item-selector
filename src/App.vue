<template>
  <main>
    <h1>Hello World</h1>
    <button>Click Me</button>
  </main>
</template>

<script setup lang="ts">
import { useChecklist } from '@/composable/useChecklist'
import { onMounted } from 'vue'

const { fetchCheckList } = useChecklist()

onMounted(async () => {
  const checklist = await fetchCheckList()
  console.log(checklist)
})
</script>

<style scoped></style>
