import { Product } from 'types/Product'

import { httpClient } from './httpClient'

export const productApi = {
  async createProduct(data: Product) {
    return httpClient().post('/admin/products/create', data)
  },
}
