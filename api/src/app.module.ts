import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from 'src/auth/auth.module'
import { AdminModule } from 'src/admin/admin.module'
import { ProductsModule } from 'src/products/products.module'
import { OrdersModule } from 'src/orders/orders.module'
import { User } from 'src/entities/User'
import { Product } from 'src/entities/Product'
import { Order } from 'src/entities/Order'
import { Category } from 'src/entities/Category'

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Product, Order, Category],
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    AdminModule,
    ProductsModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
