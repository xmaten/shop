import React from 'react'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import { useMutation } from 'react-query'

import { authApi } from 'api/auth'
import { Input } from 'components/Input'
import { Button } from 'components/Button'

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

  const loginMutation = useMutation(authApi.login, {
    onSuccess: () => {
      Router.push('/')
    },
  })

  const onSubmit = handleSubmit((data: LoginFormInputs) => {
    loginMutation.mutate(data)
  })

  return (
    <div className="container mx-auto max-w-xs pt-10">
      {loginMutation.isError && <p className="text-red-700 mb-3">There was an error. Please try again later.</p>}
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

        <Button type="submit" isDisabled={loginMutation.isLoading}>
          Login
        </Button>
      </form>
    </div>
  )
}

export default Login
