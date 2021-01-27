import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import { productApi } from 'api/product'
import { ProductCard } from 'components/products/ProductCard'

const Home = () => {
  const { data, isLoading, isError } = useQuery('products', getProducts)

  const renderProductsResponse = () => {
    if (isLoading) {
      return <p>Loading...</p>
    }

    if (isError) {
      return <p>There was an error. Please try again later.</p>
    }

    return (
      <>
        {data?.items.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </>
    )
  }

  return <div className="max-w-4xl mx-auto my-10 grid grid-cols-3 gap-6">{renderProductsResponse()}</div>
}

const getProducts = async () => {
  const data = await productApi.getAllClientProducts()

  return data?.data
}

export const getStaticProps = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('products', getProducts)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Home
