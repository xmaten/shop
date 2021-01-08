import { useRouter } from 'next/router'
import { GetStaticProps } from 'next'
import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import { productApi } from 'api/product'
import { Product } from 'types/Product'
import { AddProductToOrder } from 'components/order/AddProductToOrder'

const ProductPage = () => {
  const router = useRouter()
  const productId = Number(router.query.id)
  const { data: product, isLoading, isError } = useQuery([`clientProduct-${productId}`, productId], () =>
    getProduct(productId),
  )

  const renderProductsResponse = () => {
    if (isLoading) {
      return <p>Loading...</p>
    }

    if (isError || !product) {
      return <p>There was an error. Please try again later.</p>
    }

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

            <div className="mt-10">
              <AddProductToOrder productId={productId} />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex">
            <p className="w-1/12 font-bold">Category</p>
            <p className="w-1/12 font-bold">Price</p>
          </div>

          <div className="flex">
            <p className="w-1/12">{product.category}</p>
            <p className="w-1/12">{product.price}</p>
          </div>
        </div>
      </>
    )
  }

  return <div className="container mx-auto max-w-xxl pt-10">{renderProductsResponse()}</div>
}

const getProduct = async (id: number) => {
  const data = await productApi.getOneClientProduct(id)

  return data?.data
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
  const products = await res.json()

  const paths = products.map((product: Product) => ({
    params: { id: product.id.toString() },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient()
  const productId = Number(params?.id) || -1

  await queryClient.prefetchQuery([`clientProduct-${productId}`, productId], () => getProduct(productId))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default ProductPage
