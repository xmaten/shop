import { AxiosResponse } from 'axios'

import { Product } from 'types/Product'

import { httpClient } from './httpClient'

export const productApi = {
  async createProduct(data: Product) {
    return httpClient().post('/admin/products/create', data)
  },

  async getAllAdminProducts(): Promise<AxiosResponse<Product[]>> {
    return httpClient().get('/admin/products')
  },
}
