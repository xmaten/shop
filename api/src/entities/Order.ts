import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
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
  @CreateDateColumn()
  createdAt: Date

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date
}
