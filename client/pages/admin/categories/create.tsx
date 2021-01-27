import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import Router from 'next/router'

import { Input } from 'components/Input'
import { Button } from 'components/Button'
import { AdminWrapper } from 'components/layout/AdminWrapper'
import { useIsAdmin } from 'utils/hooks/useIsAdmin'
import { Category } from 'types/Categories'
import { categoriesApi } from 'api/categories'

const CreateCategory = () => {
  useIsAdmin()

  const { register, handleSubmit, errors } = useForm<Category>({
    defaultValues: {
      name: '',
    },
  })

  const createCategoryMutation = useMutation(categoriesApi.createCategory, {
    onSuccess: () => {
      Router.push('/admin/categories/all')
    },
  })

  const onSubmit = handleSubmit((data: Category) => {
    createCategoryMutation.mutate(data)
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
            label="Category name"
            error={errors.name}
          />

          <Button type="submit" isDisabled={createCategoryMutation.isLoading}>
            Create
          </Button>
        </form>
      </div>
    </AdminWrapper>
  )
}

export default CreateCategory
