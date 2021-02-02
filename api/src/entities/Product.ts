import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
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
  @ManyToOne(() => Category, (category) => category.id)
  category: number

  @ApiProperty()
  @Column()
  stock: number

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date
}
