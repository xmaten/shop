import { MetaResponse, LinksResponse } from './utility'

export type Product = {
  id: number
  name: string
  description: string
  price: number
  category: string
  stock: number
  image: string
}

export type NewProduct = {
  id: number
  name: string
  description: string
  price: number
  categoryId: string
  stock: number
  image: string
}

export type UpdateProductPayload = {
  productId: number
  formData: NewProduct
}

export type ProductsResponse = {
  items: Product[]
  meta: MetaResponse
  links: LinksResponse
}
