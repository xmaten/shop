import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

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

  @ApiProperty()
  @Column()
  password: string

  @ApiProperty()
  @Column()
  phone: string

  @ApiProperty()
  @Column()
  role: string
}
