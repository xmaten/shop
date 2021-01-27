import { useQuery } from 'react-query'

import { AdminWrapper } from 'components/layout/AdminWrapper'
import { OrderListItem } from 'components/order/OrderListItem'
import { OrdersListHeader } from 'components/order/OrdersListHeader'
import { orderApi } from 'api/order'

const AllOrders = () => {
  const { data, isLoading, isError } = useQuery('adminOrders', orderApi.getAllAdminOrders)

  const renderOrdersResponse = () => {
    if (isLoading) {
      return <p>Loading...</p>
    }

    if (isError) {
      return <p>There was an error. Please try again later.</p>
    }

    return (
      <>
        {data?.data.items.map((order) => (
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
      </div>
    </AdminWrapper>
  )
}

export default AllOrders
