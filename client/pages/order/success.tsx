import { useEffect } from 'react'

import { orderApi } from 'api/order'

const OrderSuccess = () => {
  useEffect(() => {
    const finalizeOrder = async () => {
      const orderId = Number(localStorage.getItem('orderId'))

      if (!orderId) {
        return
      }

      await orderApi.finalizeOrder(orderId)
      localStorage.removeItem('orderId')
    }

    finalizeOrder()
  }, [])

  return <p>Order is paid successfully</p>
}

export default OrderSuccess
