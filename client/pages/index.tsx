import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import { GetServerSideProps } from 'next'

import { productApi } from 'api/product'
import { ProductCard } from 'components/products/ProductCard'
import { FilterSortSidebar } from 'components/FilterSortSidebar'
import { SortAndFilter } from 'types/Product'
import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()
  const { data, isLoading, isError } = useQuery(['products', router.query], () => getProducts(router.query))

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

  return (
    <div className="flex">
      <FilterSortSidebar />
      <div className="w-3/4 mx-auto my-10 grid grid-cols-3 gap-6">{renderProductsResponse()}</div>
    </div>
  )
}

const getProducts = async (sortAndFilter: SortAndFilter) => {
  const data = await productApi.getAllClientProducts(sortAndFilter)

  return data?.data
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('products', () => getProducts(query))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Home
