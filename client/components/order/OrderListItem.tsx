import Link from 'next/link'

import { Order } from 'types/Order'
import { translateStatuses } from '../../utils/translateStatuses'

type Props = {
  order: Order
}

export const OrderListItem: React.FC<Props> = ({ order }) => {
  const itemClasses = 'w-1/4 flex justify-center items-center border-solid border-black border-r h-auto'

  return (
    <Link href={`/admin/orders/${order.id}`}>
      <div className="flex justify-between items-center border-solid border-black border-2 cursor-pointer mb-2">
        <div className={itemClasses}>
          <p className="font-bold">{order.totalPrice}</p>
        </div>

        <div className={itemClasses}>
          <p>{translateStatuses(order.status)}</p>
        </div>

        <div className={itemClasses}>
          <p>{order.user.fullName}</p>
        </div>

        <div className={itemClasses}>
          <p>{order.user.email}</p>
        </div>

        <div className="w-1/4 flex justify-center items-center h-auto">
          <p>{order.user.phone}</p>
        </div>
      </div>
    </Link>
  )
}
