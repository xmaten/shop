import { RegisterFormInputs } from 'pages/register'
import { LoginFormInputs } from 'pages/login'

import { httpClient } from './httpClient'

export const authApi = {
  async register(formData: RegisterFormInputs) {
    return httpClient().post('/auth/register', formData)
  },

  async login(formData: LoginFormInputs) {
    return httpClient().post('/auth/login', formData)
  },

  async logout() {
    return httpClient().post('/auth/logout')
  },
}
