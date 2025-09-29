<template>
  <div>
    <template v-for="checkbox in treeChecklist" :key="checkbox.id">
      <Checkbox
        :id="checkbox.id"
        :title="checkbox.title"
        :isFolder="checkbox.type === 'folder'"
        v-model="checkbox.isChecked"
      >
        <template v-if="checkbox.children">
          <CheckboxWrapper :treeChecklist="checkbox.children" />
        </template>
      </Checkbox>
    </template>
  </div>
</template>

<script setup lang="ts">
import Checkbox from '@/components/Checkbox.vue'
import type { ITreeCheckList } from '@/composable/useChecklistBuilder'
defineProps<{
  treeChecklist: ITreeCheckList[]
}>()
</script>
