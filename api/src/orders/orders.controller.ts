import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Get,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

import { MyRequest } from 'src/types'

import { OrdersService } from './orders.service'
import {
  ManageOrderPayload,
  NewOrder,
  OrderWithProducts,
} from './orders.interface'

@ApiTags('Orders')
@Controller('/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/')
  @ApiCreatedResponse({
    type: NewOrder,
  })
  async createOrder(@Req() request: MyRequest) {
    return this.ordersService.createOrder(request)
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

  @Get(':orderId')
  @ApiCreatedResponse({
    type: OrderWithProducts,
  })
  async getOrder(
    @Req() request: MyRequest,
    @Param('orderId', new ParseIntPipe()) orderId: number,
  ) {
    console.log(request, orderId, 'here')
    return this.ordersService.getOrder(request, orderId)
  }
}
