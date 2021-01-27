import { useQuery } from 'react-query'
import Link from 'next/link'

import { ProductListItemAdmin } from 'components/products/ProductListItemAdmin'
import { ProductListHeader } from 'components/products/ProductListHeader'
import { AdminWrapper } from 'components/layout/AdminWrapper'
import { productApi } from 'api/product'

const AllProducts = () => {
  const { data, isLoading, isError } = useQuery('adminProducts', productApi.getAllAdminProducts)

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
        <ProductListHeader />
        {renderProductsResponse()}
      </div>
    </AdminWrapper>
  )
}

export default AllProducts
