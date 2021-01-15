import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

import { Order } from 'src/entities/Order'

import { OrdersService } from './orders.service'

@ApiTags('Admin orders')
@Controller('/admin/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':orderId')
  @ApiCreatedResponse({ type: () => [Order] })
  async getOrder(@Param('orderId', new ParseIntPipe()) orderId: number) {
    return this.ordersService.getOrder(orderId)
  }

  @Get('/')
  @ApiCreatedResponse({ type: () => [Order] })
  async getAllOrders() {
    return this.ordersService.getAllOrders()
  }
}
