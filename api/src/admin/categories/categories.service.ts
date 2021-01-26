import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Category } from 'src/entities/Category'

import { CreateCategoryDto } from './category.interface'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.insert(createCategoryDto)

    return category.raw.id
  }

  async findAll() {
    return await this.categoryRepository.find()
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOne(id)
  }

  async updateCategory(id: number, createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.findOne(id)

    if (!category) {
      return 'Wrong id'
    }

    const updatedCategory = {
      ...createCategoryDto,
      updatedAt: new Date(),
    }

    return await this.categoryRepository.update(id, updatedCategory)
  }
}
