export type MetaResponse = {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

export type LinksResponse = {
  first: string
  previous: string
  next: string
  last: string
}
