export type MyRequest = Request & { session: any }

export type MyResponse = Response & { clearCookie: any; send: any }

export type Direction = 'ASC' | 'DESC'

export type Field = 'name' | 'price' | 'category'
