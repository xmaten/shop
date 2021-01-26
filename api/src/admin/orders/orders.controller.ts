import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common'
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger'

import { Order } from 'src/entities/Order'
import { OrderResponse } from 'src/types'

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
  @ApiCreatedResponse({ type: () => OrderResponse })
  @ApiQuery({
    name: 'page',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
  })
  async getAllOrders(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.ordersService.getAllOrders(page, limit)
  }
}
