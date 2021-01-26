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

  @ApiProperty()
  @Column({ type: 'timestamp', default: new Date() })
  createdAt: Date

  @ApiProperty()
  @Column({ type: 'timestamp', default: new Date() })
  updatedAt: Date
}
