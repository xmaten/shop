import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
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

  async findAll(field: Field, direction: Direction) {
    return await this.productsRepository.find({
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
