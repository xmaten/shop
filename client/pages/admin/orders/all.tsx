import { useQuery } from 'react-query'
import { useRouter } from 'next/router'

import { AdminWrapper } from 'components/layout/AdminWrapper'
import { OrderListItem } from 'components/order/OrderListItem'
import { OrdersListHeader } from 'components/order/OrdersListHeader'
import { orderApi } from 'api/order'
import { Pagination } from 'components/Pagination'

const AllOrders = () => {
  const router = useRouter()
  const { data, isLoading, isError } = useQuery(['adminOrders', router.query], () =>
    orderApi.getAllAdminOrders(router.query),
  )

  const renderOrdersResponse = () => {
    if (isLoading) {
      return <p>Loading...</p>
    }

    if (isError || !data) {
      return <p>There was an error. Please try again later.</p>
    }

    const orders = data.data.items

    return (
      <>
        {orders.map((order) => (
          <div key={order.id}>
            <OrderListItem order={order} />
          </div>
        ))}
      </>
    )
  }

  return (
    <AdminWrapper>
      <div className="container mx-auto max-w-xxl pt-10">
        <OrdersListHeader />
        {renderOrdersResponse()}
        <Pagination totalPages={data?.data.meta.totalPages || 0} currentPage={data?.data.meta.currentPage || 0} />
      </div>
    </AdminWrapper>
  )
}

export default AllOrders
