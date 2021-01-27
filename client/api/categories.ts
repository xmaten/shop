import { AxiosResponse } from 'axios'

import { Category, UpdateCategoryPayload } from 'types/Categories'

import { httpClient } from './httpClient'

export const categoriesApi = {
  async getAllCategories(): Promise<AxiosResponse<Category[]>> {
    return httpClient().get('/categories')
  },

  async getOneCategory(id: number): Promise<AxiosResponse<Category>> {
    return httpClient().get(`/admin/categories/${id}`)
  },

  async editCategory(updateCategoryPayload: UpdateCategoryPayload) {
    return httpClient().put(`/admin/categories/${updateCategoryPayload.categoryId}`, updateCategoryPayload.formData)
  },

  async createCategory(data: Category) {
    return httpClient().post('/admin/categories', data)
  },
}
