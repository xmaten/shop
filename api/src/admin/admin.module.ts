import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Product } from 'src/entities/Product'
import { User } from 'src/entities/User'
import { IsAdminMiddleware } from 'src/middlewares/isAdmin'

import { ProductsController } from './products/products.controller'
import { ProductsService } from './products/products.service'

@Module({
  imports: [TypeOrmModule.forFeature([Product, User])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IsAdminMiddleware).forRoutes('/admin/*/*')
  }
}
