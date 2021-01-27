import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { Order } from './Order'

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column()
  fullName: string

  @ApiProperty()
  @Column()
  email: string

  @Column()
  password: string

  @ApiProperty()
  @Column()
  phone: string

  @ApiProperty()
  @Column()
  role: string

  @ApiProperty()
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[]

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date
}
