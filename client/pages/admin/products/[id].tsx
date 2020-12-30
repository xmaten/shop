import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { AdminWrapper } from 'components/layout/AdminWrapper'
import { AdminFooter } from 'components/layout/AdminFooter'
import { Button } from 'components/Button'
import { productApi } from 'api/product'

const ProductPage = () => {
  const router = useRouter()
  const productId = Number(router.query.id)
  const { data, isLoading, isError } = useQuery([`adminProduct-${productId}`, productId], () =>
    productApi.getOneAdminProduct(productId),
  )

  const renderProductsResponse = () => {
    if (isLoading) {
      return <p>Loading...</p>
    }

    if (isError) {
      return <p>There was an error. Please try again later.</p>
    }

    const product = data?.data!

    return (
      <>
        <div className="flex">
          <div className="w-1/4">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="ml-5">
            <div>
              <p className="font-bold text-3xl mb-1">{product.name}</p>
            </div>

            <div>
              <p>{product.description}</p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex">
            <p className="w-1/12 font-bold">Category</p>
            <p className="w-1/12 font-bold">Price</p>
            <p className="w-1/12 font-bold">Stock</p>
          </div>

          <div className="flex">
            <p className="w-1/12">{product.category}</p>
            <p className="w-1/12">{product.price}</p>
            <p className="w-1/12">{product.stock}</p>
          </div>
        </div>
      </>
    )
  }

  return (
    <AdminWrapper>
      <div className="container mx-auto max-w-xxl pt-10">{renderProductsResponse()}</div>

      <AdminFooter>
        <div className="flex justify-between">
          <div className="w-1/4">
            <Button onClick={() => console.log('deleted')}>Delete</Button>
          </div>

          <div className="w-1/4">
            <Button href="/admin/products/edit/[id]" as={`/admin/products/edit/${productId}`}>
              Edit
            </Button>
          </div>
        </div>
      </AdminFooter>
    </AdminWrapper>
  )
}

export default ProductPage
