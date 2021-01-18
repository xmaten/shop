import { Status } from 'utils/translateStatuses'

import { Product } from './Product'

export type NewOrder = {
  orderId: number
}

export type ChangeOrderPayload = {
  orderId: number
  productId: number
}

export type Order = {
  id: number
  totalPrice: number
  status: Status
  userId: number
  products: Product[]
  user: {
    fullName: string
    email: string
    phone: string
  }
}
