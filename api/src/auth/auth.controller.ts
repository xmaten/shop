import { Body, Controller, Post, Req, Get, Res } from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

import { MyRequest, MyResponse } from 'src/types'
import { User } from 'src/entities/User'

import { RegisterPayloadDto, LoginPayloadDto } from './auth.interface'
import { AuthService } from './auth.service'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @ApiCreatedResponse({
    type: User,
  })
  async register(
    @Body() registerPayload: RegisterPayloadDto,
    @Req() request: MyRequest,
  ) {
    return this.authService.register(registerPayload, request)
  }

  @Get('/me')
  @ApiCreatedResponse({
    type: User,
  })
  async me(@Req() request: MyRequest) {
    return this.authService.getMe(request)
  }

  @Post('/login')
  @ApiCreatedResponse({
    type: User,
  })
  async login(
    @Body() loginPayload: LoginPayloadDto,
    @Req() request: MyRequest,
  ) {
    return this.authService.login(loginPayload, request)
  }

  @Post('/logout')
  async logout(@Req() request: MyRequest, @Res() response: MyResponse) {
    return this.authService.logout(request, response)
  }
}
