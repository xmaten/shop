import { ApiProperty } from '@nestjs/swagger'

export class RegisterPayloadDto {
  @ApiProperty()
  fullName: string

  @ApiProperty()
  email: string

  @ApiProperty()
  password: string

  @ApiProperty()
  phone: string
}

export class LoginPayloadDto {
  @ApiProperty()
  email: string

  @ApiProperty()
  password: string
}
