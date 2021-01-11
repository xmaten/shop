import { useMutation } from 'react-query'

import { Button } from 'components/Button'
import { orderApi } from 'api/order'

type Props = {
  productId: number
}

export const AddProductToOrder: React.FC<Props> = ({ productId }) => {
  const createOrderMutation = useMutation(orderApi.createOrder, {
    onSuccess: (data) => {
      const orderId = data.data.orderId

      if (orderId) {
        addProductToOrderMutation.mutate({ orderId, productId })
        localStorage.setItem('orderId', orderId.toString())
      }
    },
  })

  const addProductToOrderMutation = useMutation(orderApi.addProductToOrder)

  const addProductToCart = async () => {
    const orderId = Number(localStorage.getItem('orderId'))

    if (!orderId) {
      await createOrderMutation.mutate()
    } else {
      addProductToOrderMutation.mutate({ orderId, productId })
    }
  }

  return <Button onClick={addProductToCart}>Add to cart</Button>
}
