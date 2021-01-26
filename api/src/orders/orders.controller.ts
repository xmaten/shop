import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Get,
  Query,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger'

import { MyRequest, OrderResponse } from 'src/types'
import { Order } from 'src/entities/Order'

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
    return this.ordersService.getOrder(request, orderId)
  }

  @Post(':orderId/create-checkout-session')
  @ApiCreatedResponse()
  async createCheckoutSession(
    @Param('orderId', new ParseIntPipe()) orderId: number,
  ) {
    return this.ordersService.createCheckoutSession(orderId)
  }

  @Post(':orderId/finalize-order')
  @ApiCreatedResponse()
  async finalizeOrder(@Param('orderId', new ParseIntPipe()) orderId: number) {
    return this.ordersService.finalizeOrder(orderId)
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
  async getUserOrders(
    @Req() request: MyRequest,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.ordersService.getUserOrders(request, page, limit)
  }
}
