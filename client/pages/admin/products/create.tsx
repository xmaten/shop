import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import Router from 'next/router'

import { Input } from 'components/Input'
import { Button } from 'components/Button'
import { Textarea } from 'components/Textarea'
import { AdminWrapper } from 'components/layout/AdminWrapper'
import { Dropdown } from 'components/Dropdown'
import { useIsAdmin } from 'utils/hooks/useIsAdmin'
import { NewProduct, Product } from 'types/Product'
import { productApi } from 'api/product'
import { categoriesApi } from 'api/categories'
import { Category } from 'types/Categories'

const parseCategoriesForDropdown = (categories: Category[] | undefined) =>
  categories ? categories.map((category) => ({ label: category.name, value: category.id.toString() })) : []

const CreateProduct = () => {
  useIsAdmin()
  const { data } = useQuery('categories', categoriesApi.getAllCategories)

  const { register, handleSubmit, errors } = useForm<NewProduct>({
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      categoryId: '',
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
    <AdminWrapper>
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

          <Textarea
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

          <Dropdown
            name="categoryId"
            label="Category"
            error={errors.categoryId}
            options={parseCategoriesForDropdown(data?.data)}
            ref={register({
              required: 'This field is required',
            })}
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
    </AdminWrapper>
  )
}

export default CreateProduct
