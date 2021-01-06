import { ApiProperty } from '@nestjs/swagger'

export class ManageOrderPayload {
  @ApiProperty()
  productId: number
}

export class NewOrder {
  @ApiProperty()
  orderId: number
}
