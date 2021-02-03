import { AxiosResponse } from 'axios'

import { ChangeOrderPayload, NewOrder, Order, OrderResponse } from 'types/Order'
import { SortAndFilter } from 'types/Product'

import { httpClient } from './httpClient'

export const orderApi = {
  async createOrder(): Promise<AxiosResponse<NewOrder>> {
    return httpClient().post('/orders')
  },

  async addProductToOrder(addProductToOrderPayload: ChangeOrderPayload) {
    return httpClient().post(`/orders/${addProductToOrderPayload.orderId}/add`, {
      productId: addProductToOrderPayload.productId,
    })
  },

  async removeProductFromOrder(data: ChangeOrderPayload): Promise<AxiosResponse<Order>> {
    const config = {
      data,
    }

    return httpClient().delete(`/orders/${data.orderId}/remove`, config)
  },

  async getOrder(orderId: number): Promise<AxiosResponse<Order>> {
    return httpClient().get(`/orders/${orderId}`)
  },

  async goToPayment(orderId: number) {
    return httpClient().post(`/orders/${orderId}/create-checkout-session`)
  },

  async finalizeOrder(orderId: number) {
    return httpClient().post(`/orders/${orderId}/finalize-order`)
  },

  async getAllUserOrders(sortAndFilter: SortAndFilter): Promise<AxiosResponse<OrderResponse>> {
    const { page } = sortAndFilter

    return httpClient().get(`/orders?page=${page}&limit=10`)
  },

  async getAllAdminOrders(sortAndFilter: SortAndFilter): Promise<AxiosResponse<OrderResponse>> {
    const { page } = sortAndFilter

    return httpClient().get(`/admin/orders?page=${page}&limit=10`)
  },

  async getAdminOrder(orderId: number): Promise<AxiosResponse<Order>> {
    return httpClient().get(`/admin/orders/${orderId}`)
  },
}
