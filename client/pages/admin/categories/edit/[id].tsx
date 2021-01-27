import { useRouter } from 'next/router'
import { useMutation, useQuery } from 'react-query'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

import { AdminWrapper } from 'components/layout/AdminWrapper'
import { AdminFooter } from 'components/layout/AdminFooter'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { productApi } from 'api/product'
import { Product } from 'types/Product'
import { categoriesApi } from 'api/categories'
import { Category } from 'types/Categories'

const EditCategory = () => {
  const router = useRouter()
  const categoryId = Number(router.query.id)
  const { data, isLoading, isError } = useQuery([`category-${categoryId}`, categoryId], () =>
    categoriesApi.getOneCategory(categoryId),
  )

  const defaultValues = {
    name: data?.data.name || '',
  }

  const { register, handleSubmit, errors, reset } = useForm<Category>({
    defaultValues,
  })

  useEffect(() => {
    if (data?.data) {
      reset(defaultValues)
    }
  }, [data])

  const editCategoryMutation = useMutation(categoriesApi.editCategory, {
    onSuccess: () => {
      router.back()
    },
  })

  const onSubmit = handleSubmit((formData: Category) => {
    if (data?.data.id) {
      editCategoryMutation.mutate({ formData, categoryId: data?.data.id })
    }
  })

  const renderCategoryResponse = () => {
    if (isLoading) {
      return <p>Loading...</p>
    }

    if (isError) {
      return <p>There was an error. Please try again later.</p>
    }

    return (
      <form onSubmit={onSubmit}>
        <Input
          ref={register({
            required: 'This field is required',
          })}
          name="name"
          label="Category name"
          error={errors.name}
        />

        <Button type="submit" isDisabled={editCategoryMutation.isLoading}>
          Edit
        </Button>
      </form>
    )
  }

  return (
    <AdminWrapper>
      <div className="container mx-auto max-w-md pt-10">{renderCategoryResponse()}</div>

      <AdminFooter>
        <div className="flex justify-between">
          <div className="w-1/4">
            <Button onClick={() => router.back()}>Cancel</Button>
          </div>
        </div>
      </AdminFooter>
    </AdminWrapper>
  )
}

export default EditCategory
