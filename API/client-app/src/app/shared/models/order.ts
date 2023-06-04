import { ICustomer } from "./customer"
import { IEngineer } from "./engineer"
import { IItem } from "./item"
import { IPart } from "./part"

export interface IOrder {
  id: number
  orderType: string
  orderStatus: string
  customer: string
  engineer: string
}

export interface IPartNumber {
  qty: number
  partNumber: string
}



export interface IOrderDetail {
  orderType: number
  orderStatus: number
  customerId: number
  customer: ICustomer
  engineerId: number
  engineer: IEngineer
  document: any
  orderItems: IItem[]
  orderParts: IPart[]
  created: string
  createdBy: any
  lastModified: string
  lastModifiedBy: any
  id: number
}
