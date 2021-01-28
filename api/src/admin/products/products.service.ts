import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { paginate } from 'nestjs-typeorm-paginate'

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
    const payload = {
      ...createPayload,
      categoryId: Number(createPayload.categoryId),
    }

    await this.productsRepository.insert(payload)

    return createPayload
  }

  async findAll(
    field: Field = 'name',
    direction: Direction = 'ASC',
    page = 1,
    limit = 10,
    priceMin?: number,
    priceMax?: number,
  ) {
    const filterPriceMin = priceMin ? priceMin : 0
    const filterPriceMax = priceMax ? priceMax : 9999999

    const queryBuilder = this.productsRepository.createQueryBuilder('product')
    queryBuilder.leftJoinAndSelect('product.category', 'category')
    queryBuilder.where(
      'product.price >= :filterPriceMin AND product.price <= :filterPriceMax',
      { filterPriceMin, filterPriceMax },
    )
    queryBuilder.orderBy(`product.${field}`, direction)

    return paginate<Product>(queryBuilder, {
      page,
      limit,
      route: 'localhost:3000',
    })
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

  async update(id: number, updatePayload: CreateProductDto) {
    const product = await this.productsRepository.findOne(id)

    if (!product) {
      return 'Wrong id'
    }

    const updatedProduct = {
      ...updatePayload,
      updatedAt: new Date(),
    }

    return await this.productsRepository.update(id, updatedProduct)
  }

  async deleteOne(id: number) {
    const product = await this.productsRepository.findOne(id)

    if (!product) {
      return 'Wrong id'
    }

    await this.productsRepository.delete(id)
  }
}
