import { Injectable, Req } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { MyRequest } from 'src/types'
import { Order } from 'src/entities/Order'
import { User } from 'src/entities/User'
import { Product } from 'src/entities/Product'

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
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

  async getOrder(request: MyRequest, orderId: number) {
    const userId = request.session.userId
    if (!userId) {
      throw new Error('Missing user')
    }

    return await this.ordersRepository.findOne(
      { id: orderId },
      { relations: ['products'] },
    )
  }

  async addToOrder(orderId: number, productId: number) {
    const product = await this.productsRepository.findOne({
      id: productId,
    })

    if (!product) {
      throw new Error('Missing product')
    }

    if (product.stock <= 0) {
      return 'There are no items'
    }

    const productWithUpdatedStock = {
      ...product,
      stock: product.stock - 1,
    }

    await this.productsRepository.update(product.id, productWithUpdatedStock)

    const order = await Order.findOne(
      { id: orderId },
      { relations: ['products'] },
    )

    order.totalPrice = order.totalPrice
      ? order.totalPrice + product.price
      : product.price

    order.products = order.products ? [...order.products, product] : [product]

    return await order.save()
  }

  async removeFromOrder(orderId: number, productId: number) {
    const product = await this.productsRepository.findOne({
      id: productId,
    })

    if (!product) {
      throw new Error('Missing product')
    }

    const productWithUpdatedStock = {
      ...product,
      stock: product.stock + 1,
    }

    await this.productsRepository.update(product.id, productWithUpdatedStock)

    const order = await Order.findOne(
      { id: orderId },
      { relations: ['products'] },
    )

    order.totalPrice = order.totalPrice
      ? order.totalPrice - product.price
      : product.price

    order.products = order.products.filter(
      (orderProduct) => orderProduct.id !== productId,
    )

    return await order.save()
  }
}
