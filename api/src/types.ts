export type MyRequest = Request & { session: any }
export type MyResponse = Response & { clearCookie: any; send: any }
