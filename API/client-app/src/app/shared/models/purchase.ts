import { IBrand } from "./brand"

export interface IPurchaseItemAdd {

  partNumber: string
  oracleCode: string
  model: string
  description: string
  brandId: number
  image: string
  warehouseId:number
}

export interface IPurchaseItem {
  id: number
  created: string
  createdBy: string
  lastModified: string
  lastModifiedBy: string
  partNumber: string
  oracleCode: string
  model: string
  description: string
  brandId: number
  brand: IBrand
  image: string
  parts: IPurchasePart[]
}

export interface IPurchaseItemList {
  qty: number

  item: IPurchaseItem
}

export interface IPurchasePart {
  id: number
  created: string
  createdBy: string
  lastModified: string
  lastModifiedBy: string
  partNumber: string
  oracleCode: string
  description: string
  name: string
  image: string
}


export interface IPurchasePartList {
  qty: number

  part: IPurchasePart
}

export interface IPurchaseOrder {
  id: number
  created: string
  createdBy: string
  lastModified: string
  lastModifiedBy: string
  name: string
  document: string
  parts: IPurchasePartList[]
  items: IPurchaseItemList[]
}
