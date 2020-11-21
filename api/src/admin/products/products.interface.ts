import { ApiProperty } from '@nestjs/swagger'

export class CreateProductDto {
  @ApiProperty()
  name: string

  @ApiProperty()
  description: string

  @ApiProperty()
  price: number

  @ApiProperty()
  category: string

  @ApiProperty()
  stock: number

  @ApiProperty()
  image: string
}
