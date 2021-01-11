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
  status: string
  userId: number
  products: Product[]
}
