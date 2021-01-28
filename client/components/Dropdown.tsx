import { FieldError } from 'react-hook-form'
import React, { ForwardedRef } from 'react'

type Options = {
  label: string
  value: string
}

type Props = {
  name: string
  options: Options[]
  label: string
  error: FieldError | undefined
  ref: ForwardedRef<HTMLSelectElement>
}

export const Dropdown: React.FC<Props> = React.forwardRef(({ name, options, label, error }, ref) => (
  <div className="flex flex-col mb-5">
    <label htmlFor={name}>{label}</label>
    <select
      name={name}
      className={`border-2 ${error ? 'border-red-700' : 'border-blue-100'} outline-none p-1`}
      ref={ref}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error ? <p className="text-red-700 text-xs">{error.message}</p> : ''}
  </div>
))
