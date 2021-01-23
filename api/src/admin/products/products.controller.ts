import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger'

import { Product } from 'src/entities/Product'
import { Direction, Field } from 'src/types'

import { CreateProductDto } from './products.interface'
import { ProductsService } from './products.service'

@ApiTags('Admin products')
@Controller('/admin/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/create')
  @ApiCreatedResponse({
    type: Product,
  })
  async create(@Body() createPayload: CreateProductDto) {
    return this.productsService.create(createPayload)
  }

  @Get('/')
  @ApiCreatedResponse({
    type: [Product],
  })
  @ApiQuery({
    name: 'field',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'direction',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'priceMin',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'priceMax',
    required: false,
    type: Number,
  })
  async getAll(
    @Query('field') field: Field,
    @Query('direction') direction: Direction,
    @Query('priceMin') priceMin: number,
    @Query('priceMax') priceMax: number,
  ) {
    return this.productsService.findAll(field, direction, priceMin, priceMax)
  }

  @Get(':id')
  @ApiCreatedResponse({
    type: Product,
  })
  async getOneById(@Param('id', new ParseIntPipe()) id: number) {
    return this.productsService.findOne(id)
  }

  @Put(':id')
  @ApiCreatedResponse({
    type: Product,
  })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updatePayload: CreateProductDto,
  ) {
    return this.productsService.update(id, updatePayload)
  }

  @Delete(':id')
  async deleteOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.productsService.deleteOne(id)
  }
}
