import axios, { AxiosInstance } from 'axios'

export const httpClient = (): AxiosInstance => {
  const defaultOptions = {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
  }

  return axios.create(defaultOptions)
}
