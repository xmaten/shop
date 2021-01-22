import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

import { Category } from 'src/entities/Category'

import { CategoriesService } from './categories.service'

@ApiTags('Admin categories')
@Controller('/admin/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('/')
  @ApiCreatedResponse({
    type: Category,
  })
  async create(@Body() name: string) {
    return this.categoriesService.create(name)
  }

  @Get('/')
  @ApiCreatedResponse({
    type: [Category],
  })
  async getAll() {
    return this.categoriesService.findAll()
  }

  @Get(':id')
  @ApiCreatedResponse({
    type: Category,
  })
  async getOneById(@Param('id', new ParseIntPipe()) id: number) {
    return this.categoriesService.findOne(id)
  }
}
