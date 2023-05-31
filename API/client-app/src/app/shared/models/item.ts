export interface IItemPagination {
  items: IItem[]
  pageNumber: number
  totalPages: number
  totalCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export interface IDashboardItem {
  browwed: string
  sold: string
  store: string
  total: string

  degitalCheck: string
  brabouz: string
  panini: string
  xerox: string
  brands:any
  customers:any
  scanner: number[] 
  parts: number[] 
  printer: number[]
}


export interface IItem {
  partNumber: string
  serialNumber: string
  oracleCode: string
  itemStatus: string
  model: string
  description: string
  itemType: string
  brand: string
  warehouse: string
  customer: string
  engineer: string
  image: any
}

export interface IItemType {
  id: number
  name: string
  description: string
}
