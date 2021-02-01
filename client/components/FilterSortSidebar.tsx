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

export const FilterSortSidebar = () => {
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
    router.push(`?field=${data.field}&direction=${data.direction}&priceMin=${data.priceMin}&priceMax=${data.priceMax}`)
  })

  return (
    <div className="py-10 px-3 w-1/6 border-r border-black">
      <form onSubmit={onSubmit}>
        <Dropdown name="field" options={SORT_OPTIONS} label="Sort by:" error={errors.field} ref={register()} />

        <Dropdown
          name="direction"
          options={SORT_DIRECTION_OPTIONS}
          label="Direction:"
          error={errors.direction}
          ref={register()}
        />

        <Input ref={register()} name="priceMin" label="Price min" error={errors.priceMin} type="number" />

        <Input ref={register()} name="priceMax" label="Price max" error={errors.priceMax} type="number" />

        <Button type="submit">Search</Button>
      </form>
    </div>
  )
}
