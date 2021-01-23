import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Product } from 'src/entities/Product'
import { User } from 'src/entities/User'
import { IsAdminMiddleware } from 'src/middlewares/isAdmin'
import { Category } from 'src/entities/Category'

import { ProductsController } from './products/products.controller'
import { ProductsService } from './products/products.service'
import { OrdersController } from './orders/orders.controller'
import { OrdersService } from './orders/orders.service'
import { CategoriesController } from './categories/categories.controller'
import { CategoriesService } from './categories/categories.service'

@Module({
  imports: [TypeOrmModule.forFeature([Product, User, Category])],
  controllers: [ProductsController, OrdersController, CategoriesController],
  providers: [ProductsService, OrdersService, CategoriesService],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsAdminMiddleware).forRoutes('/admin/*/*')
  }
}
