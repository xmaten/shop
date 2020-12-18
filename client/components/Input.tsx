import React, { ForwardedRef } from 'react'
import { FieldError } from 'react-hook-form'

type Props = {
  ref: ForwardedRef<HTMLInputElement>
  name: string
  label: string
  type?: 'text' | 'password' | 'email'
  error?: FieldError
}

export const Input: React.FC<Props> = React.forwardRef(({ name, label, type = 'text', error }, ref) => (
  <div className="flex flex-col mb-5">
    <label htmlFor={name}>{label}</label>
    <input
      name={name}
      ref={ref}
      type={type}
      className={`border-2 ${error ? 'border-red-700' : 'border-blue-100'} outline-none`}
    />
    {error ? <p className="text-red-700 text-xs">{error.message}</p> : ''}
  </div>
))
