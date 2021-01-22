import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Category } from 'src/entities/Category'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(name: string) {
    await this.categoryRepository.insert({ name })
  }

  async findAll() {
    await this.categoryRepository.find()
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne(id)

    if (category) {
      return null
    }

    return category
  }
}
