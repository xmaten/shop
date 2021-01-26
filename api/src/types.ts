import { ApiProperty } from '@nestjs/swagger'

import { Product } from 'src/entities/Product'

export type MyRequest = Request & { session: any }

export type MyResponse = Response & { clearCookie: any; send: any }

export type Direction = 'ASC' | 'DESC'

export type Field = 'name' | 'price' | 'category'

type MetaResponse = {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

type LinksResponse = {
  first: string
  previous: string
  next: string
  last: string
}

export class ProductResponse {
  @ApiProperty()
  items: Product[]

  @ApiProperty()
  meta: MetaResponse

  @ApiProperty()
  links: LinksResponse
}
