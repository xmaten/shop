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
