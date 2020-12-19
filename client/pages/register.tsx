import React from 'react'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import { useMutation } from 'react-query'

import { authApi } from 'api/auth'
import { Input } from 'components/Input'
import { Button } from 'components/Button'

export type RegisterFormInputs = {
  fullName: string
  email: string
  phone: number | null
  password: string
  passwordConfirmation: string
}

const Register = () => {
  const { register, handleSubmit, errors, watch } = useForm<RegisterFormInputs>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: null,
      password: '',
      passwordConfirmation: '',
    },
  })

  const registerMutation = useMutation(authApi.register, {
    onSuccess: () => {
      Router.push('/login')
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const onSubmit = handleSubmit((data: RegisterFormInputs) => {
    registerMutation.mutate(data)
  })

  return (
    <div className="container mx-auto max-w-xs pt-10">
      <form onSubmit={onSubmit}>
        <Input
          ref={register({ required: 'This field is required' })}
          name="fullName"
          label="Full name"
          error={errors.fullName}
        />

        <Input
          ref={register({
            required: 'This field is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i,
              message: 'Invalid email address',
            },
          })}
          name="email"
          label="Email"
          error={errors.email}
        />

        <Input
          ref={register({
            required: 'This field is required',
          })}
          name="password"
          label="Password"
          error={errors.password}
          type="password"
        />

        <Input
          ref={register({
            required: 'This field is required',
            validate: (value) => value === watch('password') || 'Password confirmation does not match password',
          })}
          name="passwordConfirmation"
          label="Confirm password"
          error={errors.passwordConfirmation}
          type="password"
        />

        <Button onClick={onSubmit} type="submit" isDisabled={registerMutation.isLoading}>
          Register
        </Button>
      </form>
    </div>
  )
}

export default Register
