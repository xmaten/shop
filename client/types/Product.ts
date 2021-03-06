import { MetaResponse, LinksResponse } from './utility'

export type Product = {
  id: number
  name: string
  description: string
  price: number
  category: {
    id: number
    name: string
  } | null
  stock: number
  image: string
}

export type NewProduct = {
  id: number
  name: string
  description: string
  price: number
  categoryId: number
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

export type SortAndFilter = {
  field?: 'name' | 'category' | 'price'
  direction?: 'ASC' | 'DESC'
  priceMin?: number
  priceMax?: number
  page?: number
}
