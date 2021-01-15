import { Controller, Get } from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

import { Order } from 'src/entities/Order'

import { OrdersService } from './orders.service'

@ApiTags('Admin orders')
@Controller('/admin/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/')
  @ApiCreatedResponse({ type: () => [Order] })
  async getAllOrders() {
    return this.ordersService.getAllOrders()
  }
}
