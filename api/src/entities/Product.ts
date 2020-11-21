import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Product {
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
  @Column()
  category: string

  @ApiProperty()
  @Column()
  stock: number
}
