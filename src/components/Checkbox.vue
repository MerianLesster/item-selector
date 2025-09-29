<template>
  <div>
    <input type="checkbox" :id="`checkbox-${title}-${id}`" v-model="isChecked" />
    <label :for="`checkbox-${title}-${id}`">{{ title }}</label>
  </div>

  <div v-if="isFolder" style="margin-left: 20px">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: number
  title: string
  isFolder: boolean
}>()
const isChecked = defineModel<boolean>({ required: true })
</script>
