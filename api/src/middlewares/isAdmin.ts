import { Injectable, NestMiddleware } from '@nestjs/common'
import { Response } from 'express'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { MyRequest } from 'src/types'
import { User } from 'src/entities/User'

@Injectable()
export class IsAdminMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async use(request: MyRequest, res: Response, next: Function) {
    if (!request.session.userId) {
      throw new Error('Not authenticated')
    }

    const id = request.session.userId

    const user = await this.usersRepository.findOne({ id })

    if (user.role !== 'admin') {
      throw new Error('Not an admin')
    }

    next()
  }
}
