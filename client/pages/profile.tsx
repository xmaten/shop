import { useQuery } from 'react-query'
import Masonry from 'react-masonry-css'

import { orderApi } from 'api/order'
import { Pagination } from '../components/Pagination'
import { useRouter } from 'next/router'

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  600: 1,
}

const Profile = () => {
  const router = useRouter()
  const { data, isLoading, isError } = useQuery(['orders', router.query], () => orderApi.getAllUserOrders(router.query))

  const generateOrdersList = () => {
    if (isLoading) {
      return <p>Loading...</p>
    }

    if (!data) {
      return <p>Cart is empty. Add something.</p>
    }

    if (isError || !data) {
      return <p>There was an error. Please try again later.</p>
    }

    const response = data.data

    return (
      <Masonry
        breakpointCols={breakpointColumnsObj}
        columnClassName="orders-masonry__column"
        className="orders-masonry"
      >
        {response.items.map((order) => (
          <div key={order.id} className="p-5 shadow-md">
            {order.products.map((product) => (
              <div key={product.id} className="mb-8">
                <img src={product.image} alt={product.name} />
                <h2 className="font-bold mt-2">{product.name}</h2>
                <p>Price: {product.price}</p>
              </div>
            ))}

            <p className="mt-10">Total price: {order.totalPrice}</p>
          </div>
        ))}
      </Masonry>
    )
  }

  return (
    <div className="max-w-4xl mx-auto my-10">
      <h1>Your orders</h1>

      {generateOrdersList()}

      <Pagination totalPages={data?.data.meta.totalPages || 0} currentPage={data?.data.meta.currentPage || 0} />
    </div>
  )
}

export default Profile
