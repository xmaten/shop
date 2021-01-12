import { Injectable } from '@nestjs/common'
import { Repository, MoreThan } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { Product } from 'src/entities/Product'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll() {
    return await this.productsRepository.find({ where: { stock: MoreThan(0) } })
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne(id)

    if (!product) {
      return null
    }

    return product
  }
}
