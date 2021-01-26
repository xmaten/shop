import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
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
  @Column({ type: 'timestamp', default: new Date() })
  createdAt: Date

  @ApiProperty()
  @Column({ type: 'timestamp', default: new Date() })
  updatedAt: Date
}
