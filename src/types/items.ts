export interface IFolders {
  columns: ('id' | 'title' | 'parent_id')[]
  data: [number, string, number | null][]
}

export interface IItems {
  columns: ('id' | 'title' | 'folderId')[]
  data: [number, string, number | null][]
}

export interface ICheckList {
  folders: IFolders
  items: IItems
}
