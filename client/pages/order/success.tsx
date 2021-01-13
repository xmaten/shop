import { useEffect } from 'react'

const OrderSuccess = () => {
  useEffect(() => {
    localStorage.removeItem('orderId')
  }, [])

  return <p>Order is paid successfully</p>
}

export default OrderSuccess
