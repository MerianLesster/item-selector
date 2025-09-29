<template>
  <main>
    <div style="width: 275px">
      <CheckboxWrapper :treeChecklist="treeChecklist" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { useChecklist } from '@/composable/useChecklist'
import { useChecklistBuilder } from '@/composable/useChecklistBuilder'
import type { ITreeCheckList, Folder, Item } from '@/composable/useChecklistBuilder'
import CheckboxWrapper from '@/components/CheckboxWrapper.vue'

import { onMounted, ref } from 'vue'

const { fetchCheckList } = useChecklist()
const { buildCheckList } = useChecklistBuilder()

const treeChecklist = ref<ITreeCheckList[]>([])

onMounted(async () => {
  const checklist = await fetchCheckList()

  const { data: folderData } = checklist.folders
  const { data: itemsData } = checklist.items

  const folders: Folder[] = folderData.map(([id, title, parentId]) => {
    return {
      id,
      title,
      parentId,
    }
  })

  const items: Item[] = itemsData.map(([id, title, folderId]) => {
    return {
      id,
      title,
      folderId,
    }
  })

  treeChecklist.value = buildCheckList(folders, items)
})
</script>

<style scoped></style>
