import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Order } from 'src/entities/Order'
import { User } from 'src/entities/User'

import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'

@Module({
  imports: [TypeOrmModule.forFeature([Order, User])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
