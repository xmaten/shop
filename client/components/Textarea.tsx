import React, { ForwardedRef } from 'react'
import { FieldError } from 'react-hook-form'

type Props = {
  ref: ForwardedRef<HTMLTextAreaElement>
  name: string
  label: string
  error?: FieldError
}

export const Textarea: React.FC<Props> = React.forwardRef(({ name, label, error }, ref) => (
  <div className="flex flex-col mb-5">
    <label htmlFor={name}>{label}</label>
    <textarea
      name={name}
      ref={ref}
      className={`border-2 ${error ? 'border-red-700' : 'border-blue-100'} outline-none p-1`}
    />
    {error ? <p className="text-red-700 text-xs">{error.message}</p> : ''}
  </div>
))
