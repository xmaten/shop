import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

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
  async getAll(
    @Query('field') field: Field,
    @Query('direction') direction: Direction,
  ) {
    return this.productsService.findAll(field, direction)
  }

  @Get(':id')
  @ApiCreatedResponse({
    type: Product,
  })
  async getOneById(@Param('id', new ParseIntPipe()) id: number) {
    return this.productsService.findOne(id)
  }
}
