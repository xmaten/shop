import { Injectable } from '@nestjs/common'

@Injectable()
export class OrdersService {
  constructor() {}

  async createOrder() {
    console.log('created new order')
  }

  async addToOrder(orderId: number, productId: number) {
    console.log(`adding product ${productId} to order ${orderId}`)
  }

  async removeFromOrder(orderId: number, productId: number) {
    console.log(`removing product ${productId} from order ${orderId}`)
  }
}
