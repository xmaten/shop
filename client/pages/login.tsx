import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { useForm } from 'react-hook-form'
import Router from 'next/router'

import { authApi } from 'api/auth'

export type LoginFormInputs = {
  email: string
  password: string
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, errors } = useForm<LoginFormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = handleSubmit(async (data: LoginFormInputs) => {
    try {
      await authApi.login(data)

      Router.push('/')
    } catch {
      console.log('error')
    }
  })

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          ref={register({
            required: 'This field is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i,
              message: 'Invalid email address',
            },
          })}
        />

        <div>
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            ref={register({
              required: 'This field is required',
            })}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
