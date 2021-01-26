import { Injectable } from '@nestjs/common'
import { paginate } from 'nestjs-typeorm-paginate'
import { Repository } from 'typeorm'

import { Order } from 'src/entities/Order'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getAllOrders(page = 1, limit = 10) {
    return paginate<Order>(
      this.orderRepository,
      { page, limit },
      {
        relations: ['products', 'user'],
      },
    )
  }

  async getOrder(orderId: number) {
    return await Order.findOne(orderId, {
      relations: ['products', 'user'],
    })
  }
}
