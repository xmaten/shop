import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import Router from 'next/router'

import { useIsAdmin } from 'utils/hooks/useIsAdmin'
import { Input } from 'components/Input'
import { Button } from 'components/Button'
import { Product } from 'types/Product'
import { productApi } from 'api/product'

const CreateProduct = () => {
  useIsAdmin()

  const { register, handleSubmit, errors } = useForm<Product>({
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: '',
      stock: 0,
      image: '',
    },
  })

  const createProductMutation = useMutation(productApi.createProduct, {
    onSuccess: () => {
      Router.push('/admin/products/all')
    },
  })

  const onSubmit = handleSubmit((data: Product) => {
    createProductMutation.mutate(data)
  })

  return (
    <div className="container mx-auto max-w-md pt-10">
      <form onSubmit={onSubmit}>
        <Input
          ref={register({
            required: 'This field is required',
          })}
          name="name"
          label="Product name"
          error={errors.name}
        />

        <Input
          ref={register({
            required: 'This field is required',
          })}
          name="description"
          label="Description"
          error={errors.description}
        />

        <Input
          ref={register({
            required: 'This field is required',
          })}
          name="image"
          label="Image URL"
          error={errors.image}
        />

        <Input
          ref={register({
            required: 'This field is required',
          })}
          name="category"
          label="Category"
          error={errors.category}
        />

        <Input
          ref={register({
            required: 'This field is required',
          })}
          name="stock"
          label="Stock"
          error={errors.stock}
          type="number"
        />

        <Input
          ref={register({
            required: 'This field is required',
          })}
          name="price"
          label="Price"
          error={errors.price}
          type="number"
        />

        <Button type="submit" isDisabled={createProductMutation.isLoading}>
          Create
        </Button>
      </form>
    </div>
  )
}

export default CreateProduct
