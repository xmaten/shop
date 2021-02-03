import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { SortAndFilter } from 'types/Product'

import { Dropdown } from './Dropdown'
import { Button } from './Button'
import { Input } from './Input'

const SORT_OPTIONS = [
  {
    label: 'Name',
    value: 'name',
  },
  {
    label: 'Category',
    value: 'category',
  },
  {
    label: 'Price',
    value: 'price',
  },
  {
    label: 'Stock',
    value: 'stock',
  },
]

const SORT_DIRECTION_OPTIONS = [
  {
    label: 'Ascending',
    value: 'ASC',
  },
  {
    label: 'Descending',
    value: 'DESC',
  },
]

export const AdminFilterSortTopBar = () => {
  const router = useRouter()
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      field: 'name',
      direction: 'ASC',
      priceMin: undefined,
      priceMax: undefined,
    },
  })

  const onSubmit = handleSubmit((data: SortAndFilter) => {
    router.push(
      `/admin/products/all?field=${data.field}&direction=${data.direction}&priceMin=${data.priceMin}&priceMax=${data.priceMax}`,
    )
  })

  return (
    <form onSubmit={onSubmit} className="flex justify-between items-center mb-5 w-full">
      <div className="w-1/5 mx-2">
        <Dropdown name="field" options={SORT_OPTIONS} label="Sort by:" error={errors.field} ref={register()} />
      </div>

      <div className="w-1/5 mx-2">
        <Dropdown
          name="direction"
          options={SORT_DIRECTION_OPTIONS}
          label="Direction:"
          error={errors.direction}
          ref={register()}
        />
      </div>

      <div className="w-1/5 mx-2">
        <Input ref={register()} name="priceMin" label="Price min" error={errors.priceMin} type="number" />
      </div>

      <div className="w-1/5 mx-2">
        <Input ref={register()} name="priceMax" label="Price max" error={errors.priceMax} type="number" />
      </div>

      <div className="w-1/5 mx-2">
        <Button type="submit">Search</Button>
      </div>
    </form>
  )
}
