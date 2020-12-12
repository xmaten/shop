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

export type LoginFormInputs = {
  email: string
  password: string
}

const useSubmitButtonStyles = makeStyles({
  root: {
    width: '100%',
    marginTop: '50px',
  },
})

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)

  const classes = useSubmitButtonStyles()

  const { register, handleSubmit, errors, watch } = useForm<LoginFormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = handleSubmit(async (data: LoginFormInputs) => {
    try {
      await authApi.register(data)

      Router.push('/')
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

        <Button variant="contained" color="primary" type="submit" className={classes.root} fullWidth>
          Login
        </Button>
      </form>
    </Container>
  )
}

export default Login
