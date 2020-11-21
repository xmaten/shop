import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Product } from 'src/entities/Product'
import { User } from 'src/entities/User'

import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'

@Module({
  imports: [TypeOrmModule.forFeature([Product, User])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
