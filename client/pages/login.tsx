import React from 'react'
import { useForm } from 'react-hook-form'
import Router from 'next/router'

import { Input } from 'components/Input'
import { authApi } from 'api/auth'
import { Button } from '../components/Button'

export type LoginFormInputs = {
  email: string
  password: string
}

const Login = () => {
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
    <div className="container mx-auto max-w-xs pt-10">
      <form onSubmit={onSubmit}>
        <Input
          ref={register({
            required: 'This field is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i,
              message: 'Invalid email address',
            },
          })}
          name="email"
          label="E-mail"
          type="email"
          error={errors.email}
        />

        <Input
          ref={register({
            required: 'This field is required',
          })}
          name="password"
          label="Password"
          type="password"
          error={errors.password}
        />

        <Button type="submit" onClick={onSubmit}>
          Login
        </Button>
      </form>
    </div>
  )
}

export default Login
