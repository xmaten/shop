import { ApiProperty } from '@nestjs/swagger'

export class CreateProductDto {
  @ApiProperty()
  name: string

  @ApiProperty()
  description: string

  @ApiProperty()
  price: number

  @ApiProperty()
  categoryId: number

  @ApiProperty()
  stock: number

  @ApiProperty()
  image: string
}
