import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { AdminWrapper } from 'components/layout/AdminWrapper'
import { ProductCard } from 'components/products/ProductCard'
import { OrdersListHeader } from 'components/order/OrdersListHeader'
import { OrderListItem } from 'components/order/OrderListItem'
import { orderApi } from 'api/order'

const OrderPage = () => {
  const router = useRouter()
  const orderId = Number(router.query.id)
  const { data, isLoading, isError } = useQuery([`adminOrder-${orderId}`, orderId], () =>
    orderApi.getAdminOrder(orderId),
  )

  const renderOrdersResponse = () => {
    if (isLoading) {
      return <p>Loading...</p>
    }

    if (isError) {
      return <p>There was an error. Please try again later.</p>
    }

    const order = data?.data!

    return (
      <>
        <div className="flex flex-col">
          {order.products.map((product) => (
            <div key={product.id} className="w-1/4">
              <ProductCard product={product} />
            </div>
          ))}

          <div className="mt-10">
            <OrdersListHeader />
            <OrderListItem order={order} />
          </div>
        </div>
      </>
    )
  }

  return (
    <AdminWrapper>
      <div className="container mx-auto max-w-xxl pt-10">{renderOrdersResponse()}</div>
    </AdminWrapper>
  )
}

export default OrderPage
