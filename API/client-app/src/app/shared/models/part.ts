export interface IPartPagination {
  items: IPart[]
  pageNumber: number
  totalPages: number
  totalCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}

export interface IPart {
  partNumber: string
  oracleCode: string
  model: string
  description: string
  created: string
  createdBy: string
  customer: string
  warehouse: string
  engineer: string
  orderDate: string
  partStatus: number
  brandId: number
  warehouseId: number
  customerId: number
  engneerId: number
  image: string
}
