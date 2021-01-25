import { Injectable } from '@nestjs/common'
import { Repository, getConnection } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { Product } from 'src/entities/Product'
import { Direction, Field } from 'src/types'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

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
      .leftJoinAndSelect('product.category', 'category')
      .where(
        'product.stock > 0 AND product.price >= :filterPriceMin AND product.price <= :filterPriceMax',
        { filterPriceMin, filterPriceMax },
      )
      .orderBy(`product.${field}`, direction)
      .getMany()
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne(id, {
      relations: ['category'],
    })

    if (!product) {
      return null
    }

    return product
  }
}
