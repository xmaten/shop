export type Category = {
  id: number
  name: string
}

export type UpdateCategoryPayload = {
  categoryId: number
  formData: Category
}
