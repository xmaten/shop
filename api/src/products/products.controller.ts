import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common'
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger'

import { Product } from 'src/entities/Product'

import { ProductsService } from './products.service'

import { Direction, Field } from 'src/types'

@ApiTags('Products')
@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

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
}
