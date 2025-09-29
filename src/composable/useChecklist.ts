import type { ICheckList } from '@/types/items'

export const useChecklist = () => {
  const checkList: ICheckList = {
    folders: {
      columns: ['id', 'title', 'parent_id'],
      data: [
        [1, 'Audio', null],
        [4, 'Speakers', 1],
        [8, 'Rigging', null],
        [10, 'Active speakers', 4],
        [2, 'Passive speakers', 4],
        [6, 'Truss', 8],
      ],
    },
    items: {
      columns: ['id', 'title', 'folderId'],
      data: [
        [3, 'Passive Speakers Item 1', 2],
        [8, 'Truss item 2', 6],
        [7, 'Speaker item 1', 4],
        [5, 'Audio item 1', 1],
        [1, 'Active Speakers Item 1', 10],
        [4, 'Speaker item 2', 4],
        [6, 'Truss item 1', 6],
      ],
    },
  }

  const fetchCheckList = async () => {
    // simulate data fetching with a delay
    return new Promise<ICheckList>((resolve) => {
      setTimeout(() => {
        resolve(checkList)
      }, 500)
    })
  }
  return { fetchCheckList }
}
