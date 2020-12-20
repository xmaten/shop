import { useQuery } from 'react-query'

import { ProductListItem } from 'components/products/ProductListItem'
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
        {data?.data.map((product) => (
          <ProductListItem key={product.name} product={product} />
        ))}
      </>
    )
  }

  return (
    <AdminWrapper>
      <div className="container mx-auto max-w-xxl pt-10">
        <>
          <ProductListHeader />
          {renderProductsResponse()}
        </>
      </div>
    </AdminWrapper>
  )
}

export default AllProducts
