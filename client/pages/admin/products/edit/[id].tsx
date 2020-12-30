import { useRouter } from 'next/router'
import { useMutation, useQuery } from 'react-query'
import { useForm } from 'react-hook-form'

import { AdminWrapper } from 'components/layout/AdminWrapper'
import { AdminFooter } from 'components/layout/AdminFooter'
import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { Textarea } from 'components/Textarea'
import { productApi } from 'api/product'
import { Product } from 'types/Product'
import { useEffect } from 'react'

const ProductPage = () => {
  const router = useRouter()
  const productId = Number(router.query.id)
  const { data, isLoading, isError } = useQuery([`adminProduct-${productId}`, productId], () =>
    productApi.getOneAdminProduct(productId),
  )

  const defaultValues = {
    name: data?.data.name || '',
    description: data?.data.description || '',
    price: data?.data.price || 0,
    category: data?.data.category || '',
    stock: data?.data.stock || 0,
    image: data?.data.image || '',
  }

  const { register, handleSubmit, errors, reset } = useForm<Product>({
    defaultValues,
  })

  useEffect(() => {
    if (data?.data) {
      reset(defaultValues)
    }
  }, [data])

  const editProductMutation = useMutation(productApi.editProduct, {
    onSuccess: () => {
      router.back()
    },
  })

  const onSubmit = handleSubmit((formData: Product) => {
    if (data?.data.id) {
      editProductMutation.mutate({ formData, productId: data?.data.id })
    }
  })

  const renderProductsResponse = () => {
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

        <Button type="submit" isDisabled={editProductMutation.isLoading}>
          Edit
        </Button>
      </form>
    )
  }

  return (
    <AdminWrapper>
      <div className="container mx-auto max-w-md pt-10">{renderProductsResponse()}</div>

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

export default ProductPage
