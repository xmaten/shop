import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  BaseEntity,
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { Product } from './Product'
import { User } from './User'

@Entity()
export class Order extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.orders)
  user: User

  @ApiProperty()
  @ManyToMany(() => Product, { cascade: true })
  @JoinTable()
  products: Product[]

  @ApiProperty()
  @Column({ nullable: true })
  totalPrice: number

  @ApiProperty()
  @Column()
  status: string

  @ApiProperty()
  @Column({ type: 'timestamp', default: new Date() })
  createdAt: Date

  @ApiProperty()
  @Column({ type: 'timestamp', default: new Date() })
  updatedAt: Date
}
