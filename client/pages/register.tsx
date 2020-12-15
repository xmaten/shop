import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { useForm } from 'react-hook-form'
import Router from 'next/router'

import { authApi } from 'api/auth'

export type RegisterFormInputs = {
  fullName: string
  email: string
  phone: number | null
  password: string
  passwordConfirmation: string
}

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)

  const { register, handleSubmit, errors, watch } = useForm<RegisterFormInputs>({
    defaultValues: {
      fullName: '',
      email: '',
      phone: null,
      password: '',
      passwordConfirmation: '',
    },
  })

  const onSubmit = handleSubmit(async (data: RegisterFormInputs) => {
    try {
      await authApi.register(data)

      Router.push('/login')
    } catch {
      console.log('error')
    }
  })

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="fullName" ref={register({ required: 'This field is required' })} />

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

        <input ref={register({ required: 'This field is required' })} />

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

        <div>
          <label htmlFor="passwordConfirmation">Confirm password</label>
          <input
            type={showRepeatPassword ? 'text' : 'password'}
            name="passwordConfirmation"
            ref={register({
              required: 'This field is required',
              validate: (value) => value === watch('password') || 'Password confirmation does not match password',
            })}
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
