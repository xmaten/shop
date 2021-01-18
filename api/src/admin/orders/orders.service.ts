import { Injectable } from '@nestjs/common'

import { Order } from 'src/entities/Order'

@Injectable()
export class OrdersService {
  constructor() {}

  async getAllOrders() {
    return await Order.find({
      relations: ['products', 'user'],
    })
  }

  async getOrder(orderId: number) {
    return await Order.findOne(orderId, {
      relations: ['products', 'user'],
    })
  }
}
