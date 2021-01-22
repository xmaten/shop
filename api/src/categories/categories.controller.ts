import { Controller, Get } from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

import { Category } from 'src/entities/Category'

import { CategoriesService } from './categories.service'

@ApiTags('Categories')
@Controller('/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/')
  @ApiCreatedResponse({
    type: [Category],
  })
  async getAll() {
    return this.categoriesService.findAll()
  }
}
