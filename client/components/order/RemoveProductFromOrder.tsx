import { useMutation, useQueryClient } from 'react-query'

import { Button } from 'components/Button'
import { orderApi } from 'api/order'

type Props = {
  productId: number
}

export const RemoveProductFromOrder: React.FC<Props> = ({ productId }) => {
  const queryClient = useQueryClient()

  const removeProductMutation = useMutation(orderApi.removeProductFromOrder, {
    onSuccess: (data) => queryClient.setQueryData('order', data) as any,
  })

  const removeProductFromOrder = () => {
    const orderId = Number(localStorage.getItem('orderId'))

    if (orderId) {
      removeProductMutation.mutate({ orderId, productId })
    }
  }

  return <Button onClick={removeProductFromOrder}>Remove</Button>
}
