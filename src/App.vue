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

type ITreeCheckList = {
  id: number
  title: string
  parentId?: number | null
  folderId?: number | null
  type: 'folder' | 'item'
  children: ITreeCheckList[]
  isChecked: boolean
}

type Folder = { id: number; title: string; parentId: number | null }
type Item = { id: number; title: string; folderId: number | null }

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

  // folders: {
  //     columns: ['id', 'title', 'parent_id'],
  //     data: [
  //       [1, 'Audio', null],
  //       [4, 'Speakers', 1],
  //       [8, 'Rigging', null],
  //       [10, 'Active speakers', 4],
  //       [2, 'Passive speakers', 4],
  //       [6, 'Truss', 8],
  //     ],
  //   },
  //   items: {
  //     columns: ['id', 'title', 'folderId'],
  //     data: [
  //       [3, 'Passive Speakers Item 1', 2],
  //       [8, 'Truss item 2', 6],
  //       [7, 'Speaker item 1', 4],
  //       [5, 'Audio item 1', 1],
  //       [1, 'Active Speakers Item 1', 10],
  //       [4, 'Speaker item 2', 4],
  //       [6, 'Truss item 1', 6],
  //     ],
  //   },

  const folderMap = new Map<number, ITreeCheckList>()
  folders.forEach((folder) =>
    folderMap.set(folder.id, {
      id: folder.id,
      title: folder.title,
      parentId: folder.parentId,
      type: 'folder',
      children: [],
      isChecked: false,
    }),
  )

  console.log(folderMap.values())

  const treeChecklist: ITreeCheckList[] = []
  for (const folder of folderMap.values()) {
    if (folder.parentId == null) {
      treeChecklist.push(folder)
    } else {
      const parent = folderMap.get(folder.parentId)
      if (parent) {
        parent.children.push(folder)
      }
    }
  }

  items.forEach((item) => {
    const itemNode: ITreeCheckList = {
      id: item.id,
      title: item.title,
      folderId: item.folderId,
      type: 'item',
      children: [],
      isChecked: false,
    }
    const parent = item.folderId !== null ? folderMap.get(item.folderId) : undefined
    if (parent) {
      parent.children.push(itemNode)
    }
  })

  console.log(treeChecklist)
})
</script>

<style scoped></style>
