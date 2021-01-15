import { AxiosResponse } from 'axios'

import { ChangeOrderPayload, NewOrder, Order } from 'types/Order'

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

  async getAllUserOrders(): Promise<AxiosResponse<Order[]>> {
    return httpClient().get(`/orders`)
  },
}
