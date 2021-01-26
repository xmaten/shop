import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

import { Category } from 'src/entities/Category'

import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './category.interface'

@ApiTags('Admin categories')
@Controller('/admin/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('/')
  @ApiCreatedResponse({
    type: Category,
  })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto)
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

  @Put(':id')
  @ApiCreatedResponse({
    type: Category,
  })
  async updateCategory(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(id, createCategoryDto)
  }
}
