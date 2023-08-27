import { IBrand } from "./brand"
import { ICustomer } from "./customer"
import { IEngineer } from "./engineer"
import { IWarehouse } from "./warehouse"

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
  localCode: string
  itemStatus: number
  addVoucher: number
  model: string
  description: string
  created: string
  createdBy: string
  orderDate: string
  itemType: string
  brand: string
  brandId: number
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

export interface IItemDetail {
  partNumber: string
  serialNumber: string
  oracleCode: string
  localCode: string
  itemStatus: number
  partStatus: number
  model: string
  description: string
  brand: IBrand
  id: number
  addVoucher: number
  warehouse: IWarehouse
  customer: ICustomer
  engineer: IEngineer
  orderDate: string
  created: string
  createdBy: string
  lastModified: string
  lastModifiedBy: string
  image: any

}
