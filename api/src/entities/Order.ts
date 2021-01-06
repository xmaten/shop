import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { Product } from './Product'
import { User } from './User'

@Entity()
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.orders)
  user: User

  @ApiProperty()
  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[]

  @ApiProperty()
  @Column({ nullable: true })
  totalPrice: number

  @ApiProperty()
  @Column()
  status: string
}
