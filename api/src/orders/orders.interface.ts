import { ApiProperty } from '@nestjs/swagger'

export class ManageOrderPayload {
  @ApiProperty()
  productId: number
}
