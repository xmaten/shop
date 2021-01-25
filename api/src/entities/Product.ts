import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { Category } from './Category'

@Entity()
export class Product extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column()
  name: string

  @ApiProperty()
  @Column()
  image: string

  @ApiProperty()
  @Column()
  description: string

  @ApiProperty()
  @Column()
  price: number

  @ApiProperty()
  @OneToOne(() => Category)
  @JoinColumn()
  category: number

  @ApiProperty()
  @Column()
  stock: number
}
