import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

import { Product } from 'src/entities/Product'

import { ProductsService } from './products.service'

@ApiTags('Products')
@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  @ApiCreatedResponse({
    type: [Product],
  })
  async getAll() {
    return this.productsService.findAll()
  }

  @Get(':id')
  @ApiCreatedResponse({
    type: Product,
  })
  async getOneById(@Param('id', new ParseIntPipe()) id: number) {
    return this.productsService.findOne(id)
  }
}
