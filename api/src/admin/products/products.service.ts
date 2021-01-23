import { Injectable } from '@nestjs/common'
import { getConnection, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { Product } from 'src/entities/Product'
import { Direction, Field } from 'src/types'

import { CreateProductDto } from './products.interface'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createPayload: CreateProductDto) {
    await this.productsRepository.insert(createPayload)

    return createPayload
  }

  async findAll(
    field: Field = 'name',
    direction: Direction = 'ASC',
    priceMin?: number,
    priceMax?: number,
  ) {
    const filterPriceMin = priceMin ? priceMin : 0
    const filterPriceMax = priceMax ? priceMax : 9999999

    return getConnection()
      .getRepository(Product)
      .createQueryBuilder('product')
      .where(
        'product.stock > 0 AND product.price >= :filterPriceMin AND product.price <= :filterPriceMax',
        { filterPriceMin, filterPriceMax },
      )
      .orderBy(`product.${field}`, direction)
      .getMany()
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne(id)

    if (!product) {
      return null
    }

    return product
  }

  async update(id: number, updatePayload: CreateProductDto) {
    const product = await this.productsRepository.findOne(id)

    if (!product) {
      return 'Wrong id'
    }

    return await this.productsRepository.update(id, updatePayload)
  }

  async deleteOne(id: number) {
    const product = await this.productsRepository.findOne(id)

    if (!product) {
      return 'Wrong id'
    }

    await this.productsRepository.delete(id)
  }
}
