import { Injectable, Req } from '@nestjs/common'
import { hash, verify } from 'argon2'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { User } from 'src/entities/User'
import { MyRequest, MyResponse } from 'src/types'
import { COOKIE_NAME } from 'src/constants'

import { LoginPayloadDto, RegisterPayloadDto } from './auth.interface'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async register(
    { fullName, password, email, phone }: RegisterPayloadDto,
    @Req() request: MyRequest,
  ) {
    const user = await this.usersRepository.findOne({ email })

    if (user) {
      return 'Email already taken'
    }

    const hashedPassword = await hash(password)

    const newUser = {
      id: 0,
      fullName,
      email,
      phone,
      password: hashedPassword,
      role: 'customer',
    }

    await this.usersRepository.insert(newUser)

    return {
      ...newUser,
      password: '',
    }
  }

  async getMe(@Req() request: MyRequest) {
    if (!request.session.userId) {
      return null
    }

    const user = await this.usersRepository.findOne({
      id: request.session.userId,
    })

    return {
      ...user,
      password: '',
    }
  }

  async login({ email, password }: LoginPayloadDto, request: MyRequest) {
    const user = await this.usersRepository.findOne({ email })

    if (!user) {
      return "User doesn't exist"
    }

    const valid = await verify(user.password, password)

    if (!valid) {
      return 'Incorrect password'
    }

    request.session.userId = user.id

    return {
      ...user,
      password: '',
    }
  }

  logout(request: MyRequest, response: MyResponse) {
    return new Promise((resolve) => {
      request.session.destroy((err) => {
        response.clearCookie(COOKIE_NAME)

        if (err) {
          resolve(false)
          return
        }

        resolve(true)
        response.send()
      })
    })
  }
}
