export type ITreeCheckList = {
  id: number
  title: string
  parentId?: number | null
  folderId?: number | null
  type: 'folder' | 'item'
  children: ITreeCheckList[]
  isChecked: boolean
}

export type Folder = { id: number; title: string; parentId: number | null }
export type Item = { id: number; title: string; folderId: number | null }

export const useChecklistBuilder = () => {
  const buildCheckList = (folders: Folder[], items: Item[]): ITreeCheckList[] => {
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
        parent.children.sort((a, b) => {
          return a.title.localeCompare(b.title)
        })
      }
    })

    return treeChecklist
  }

  return { buildCheckList }
}
