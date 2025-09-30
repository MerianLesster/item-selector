<template>
  <main>
    <div class="item-selector-container">
      <div class="item-selector">
        <CheckboxWrapper :treeChecklist="treeChecklist" />
      </div>
      <p class="selected-item-ids">Selected Item IDs: {{ selectedItemIds.join(', ') }}</p>
      <button class="clear-selection-btn" @click="clearSelection">
        <span>Clear Selection</span>
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useChecklist } from '@/composable/useChecklist'
import { useChecklistBuilder } from '@/composable/useChecklistBuilder'
import type { ITreeCheckList, Folder, Item } from '@/composable/useChecklistBuilder'
import CheckboxWrapper from '@/components/CheckboxWrapper.vue'

import { computed, onMounted, ref } from 'vue'

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

const selectedItemIds = computed(() => {
  const ids: number[] = []
  const collectSelectedIds = (list: ITreeCheckList[]) => {
    list.forEach((item) => {
      if (item.isChecked && (!item.children || item.children.length === 0)) {
        ids.push(item.id)
      }
      if (item.children && item.children.length > 0) {
        collectSelectedIds(item.children)
      }
    })
  }
  collectSelectedIds(treeChecklist.value)
  return ids
})

const clearSelection = () => {
  // uncheck all items in the treeChecklist
  const uncheckAll = (list: ITreeCheckList[]) => {
    list.forEach((item) => {
      item.isChecked = false
      if (item.children && item.children.length > 0) {
        uncheckAll(item.children)
      }
    })
  }
  uncheckAll(treeChecklist.value)
}
</script>

<style scoped>
.item-selector-container {
  width: 275px;
}

.item-selector {
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
}

.selected-item-ids {
  margin: 16px 0;
}

.clear-selection-btn {
  float: right;
}
</style>
