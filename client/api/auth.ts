import { RegisterFormInputs } from 'pages/register'

import { httpClient } from './httpClient'

export const authApi = {
  async register(formData: RegisterFormInputs) {
    return httpClient().post('/auth/register', formData)
  },
}
