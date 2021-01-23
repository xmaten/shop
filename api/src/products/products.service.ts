import { Injectable } from '@nestjs/common'
import { Repository, MoreThan } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { Product } from 'src/entities/Product'
import { Direction, Field } from 'src/types'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(field: Field, direction: Direction) {
    return await this.productsRepository.find({
      where: { stock: MoreThan(0) },
      order: { [field]: direction },
    })
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne(id)

    if (!product) {
      return null
    }

    return product
  }
}
