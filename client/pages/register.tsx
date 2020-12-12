import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
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

const useSubmitButtonStyles = makeStyles({
  root: {
    width: '100%',
  },
})

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showRepeatPassword, setShowRepeatPassword] = useState(false)

  const classes = useSubmitButtonStyles()

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
    <Container maxWidth="sm">
      <form onSubmit={onSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Full name"
          name="fullName"
          inputRef={register({ required: 'This field is required' })}
          error={!!errors.fullName?.message}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          inputRef={register({
            required: 'This field is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,5}$/i,
              message: 'Invalid email address',
            },
          })}
          error={!!errors.email?.message}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Phone number"
          name="phone"
          inputRef={register({ required: 'This field is required' })}
          error={!!errors.phone?.message}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="password" error={!!errors.password?.message}>
            Password
          </InputLabel>
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            inputRef={register({
              required: 'This field is required',
            })}
            error={!!errors.password?.message}
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="passwordConfirmation" error={!!errors.passwordConfirmation?.message}>
            Confirm password
          </InputLabel>
          <Input
            type={showRepeatPassword ? 'text' : 'password'}
            name="passwordConfirmation"
            inputRef={register({
              required: 'This field is required',
              validate: (value) => value === watch('password') || 'Password confirmation does not match password',
            })}
            error={!!errors.passwordConfirmation?.message}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                >
                  {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Button variant="contained" color="primary" type="submit" className={classes.root} fullWidth>
          Register
        </Button>
      </form>
    </Container>
  )
}

export default Register
