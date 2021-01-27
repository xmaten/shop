export type Product = {
  id: number
  name: string
  description: string
  price: number
  category: string
  stock: number
  image: string
}

export type UpdateProductPayload = {
  productId: number
  formData: Product
}

type MetaResponse = {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

type LinksResponse = {
  first: string
  previous: string
  next: string
  last: string
}

export type ProductsResponse = {
  items: Product[]
  meta: MetaResponse
  links: LinksResponse
}
