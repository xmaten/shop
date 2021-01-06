import { Injectable, Req } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { MyRequest } from 'src/types'
import { Order } from 'src/entities/Order'
import { User } from 'src/entities/User'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createOrder(@Req() request: MyRequest) {
    const userId = request.session.userId
    if (!userId) {
      throw new Error('Missing user')
    }

    const user = await this.usersRepository.findOne({
      id: userId,
    })

    const data = await this.ordersRepository.insert({ status: 'created', user })

    return {
      orderId: data.raw[0].id,
    }
  }

  async addToOrder(orderId: number, productId: number) {
    console.log(`adding product ${productId} to order ${orderId}`)
  }

  async removeFromOrder(orderId: number, productId: number) {
    console.log(`removing product ${productId} from order ${orderId}`)
  }
}
