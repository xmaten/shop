import { AxiosResponse } from 'axios'

import { Product, UpdateProductPayload, ProductsResponse, SortAndFilter } from 'types/Product'

import { httpClient } from './httpClient'

export const productApi = {
  async createProduct(data: Product) {
    return httpClient().post('/admin/products/create', data)
  },

  async editProduct(updateProductPayload: UpdateProductPayload) {
    return httpClient().put(`/admin/products/${updateProductPayload.productId}`, updateProductPayload.formData)
  },

  async deleteProduct(productId: number) {
    return httpClient().delete(`/admin/products/${productId}`)
  },

  async getAllAdminProducts(): Promise<AxiosResponse<ProductsResponse>> {
    return httpClient().get('/admin/products')
  },

  async getOneAdminProduct(productId: number): Promise<AxiosResponse<Product>> {
    return httpClient().get(`/admin/products/${productId}`)
  },

  async getAllClientProducts(sortAndFilter: SortAndFilter): Promise<AxiosResponse<ProductsResponse>> {
    const { field, direction, priceMin, priceMax } = sortAndFilter

    return httpClient().get(
      `/products?field=${field || 'name'}&direction=${direction || 'ASC'}&priceMin=${priceMin}&priceMax=${priceMax}`,
    )
  },

  async getOneClientProduct(productId: number): Promise<AxiosResponse<Product>> {
    return httpClient().get(`/admin/products/${productId}`)
  },
}
