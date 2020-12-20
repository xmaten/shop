import { useQuery } from 'react-query'

import { productApi } from 'api/product'
import { ProductListItem } from 'components/products/ProductListItem'
import { ProductListHeader } from 'components/products/ProductListHeader'

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
    <div className="container mx-auto max-w-xxl pt-10">
      <>
        <ProductListHeader />
        {renderProductsResponse()}
      </>
    </div>
  )
}

export default AllProducts
