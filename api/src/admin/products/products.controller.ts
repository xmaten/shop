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
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

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
