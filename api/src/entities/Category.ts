import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Category extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column()
  name: string
}
