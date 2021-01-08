import { AxiosResponse } from 'axios'

import { ChangeOrderPayload, NewOrder } from 'types/Order'

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

  async removeProductFromOrder(orderId: number, data: ChangeOrderPayload) {
    const config = {
      data,
    }

    return httpClient().delete(`/orders/${orderId}/remove`, config)
  },
}
