import { useQuery } from 'react-query'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { ProductListItemAdmin } from 'components/products/ProductListItemAdmin'
import { ProductListHeader } from 'components/products/ProductListHeader'
import { AdminWrapper } from 'components/layout/AdminWrapper'
import { AdminFilterSortTopBar } from 'components/AdminFilterSortTopBar'
import { productApi } from 'api/product'

const AllProducts = () => {
  const router = useRouter()
  const { data, isLoading, isError } = useQuery(['adminProducts', router.query], () =>
    productApi.getAllAdminProducts(router.query),
  )

  const renderProductsResponse = () => {
    if (isLoading) {
      return <p>Loading...</p>
    }

    if (isError) {
      return <p>There was an error. Please try again later.</p>
    }

    return (
      <>
        {data?.data.items.map((product) => (
          <ProductListItemAdmin key={product.name} product={product} />
        ))}
      </>
    )
  }

  return (
    <AdminWrapper>
      <div className="container mx-auto max-w-xxl pt-10">
        <Link href="/admin/products/create">
          <a className="mt-5 mb-10 mr-10 font-bold block text-right">Create new product</a>
        </Link>
        <AdminFilterSortTopBar />
        <ProductListHeader />
        {renderProductsResponse()}
      </div>
    </AdminWrapper>
  )
}

export default AllProducts
