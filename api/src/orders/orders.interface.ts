import { ApiProperty } from '@nestjs/swagger'

import { Product } from 'src/entities/Product'

export class ManageOrderPayload {
  @ApiProperty()
  productId: number
}

export class NewOrder {
  @ApiProperty()
  orderId: number
}

export class OrderWithProducts {
  @ApiProperty()
  id: number

  @ApiProperty()
  totalPrice: number

  @ApiProperty()
  status: string

  @ApiProperty()
  userId: number

  @ApiProperty()
  products: Product[]
}
