import { useQuery } from 'react-query'

import { ProductListItemClient } from 'components/products/ProductListItemClient'
import { RemoveProductFromOrder } from 'components/order/RemoveProductFromOrder'
import { Button } from 'components/Button'
import { orderApi } from 'api/order'

const Cart = () => {
  const { data, isError, isLoading } = useQuery('order', () => getOrder())

  const getOrder = () => {
    const orderId = Number(localStorage.getItem('orderId'))

    if (orderId) {
      return orderApi.getOrder(orderId)
    }
  }

  const renderOrder = () => {
    if (isLoading) {
      return <p>Loading...</p>
    }

    if (isError || !data) {
      return <p>There was an error. Please try again later.</p>
    }

    const response = data.data

    return (
      <div>
        {response.products.map((product) => (
          <div key={product.id} className="flex items-center justify-center">
            <ProductListItemClient product={product} />
            <div className="ml-5">
              <RemoveProductFromOrder productId={product.id} />
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between mt-10">
          <h3 className="text-2xl font-bold">
            Total price: <span className="font-normal">{response.totalPrice} PLN</span>
          </h3>

          <div>
            <Button href="/order/payment">Go to payment</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-4xl pt-10">
      <h1 className="text-4xl mb-4">Cart</h1>
      <div>{renderOrder()}</div>
    </div>
  )
}

export default Cart
