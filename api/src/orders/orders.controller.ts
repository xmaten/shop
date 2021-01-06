import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { OrdersService } from './orders.service'
import { ManageOrderPayload } from './orders.interface'

@ApiTags('Orders')
@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/')
  async createOrder() {
    return this.ordersService.createOrder()
  }

  @Post(':orderId/add')
  async addToOrder(
    @Param('orderId', new ParseIntPipe()) orderId: number,
    @Body() orderPayload: ManageOrderPayload,
  ) {
    return this.ordersService.addToOrder(orderId, orderPayload.productId)
  }

  @Delete(':orderId/remove')
  async removeFromOrder(
    @Param('orderId', new ParseIntPipe()) orderId: number,
    @Body() orderPayload: ManageOrderPayload,
  ) {
    return this.ordersService.removeFromOrder(orderId, orderPayload.productId)
  }
}
