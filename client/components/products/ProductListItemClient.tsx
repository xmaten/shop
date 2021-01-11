import Link from 'next/link'

import { Product } from 'types/Product'

type Props = {
  product: Product
}

export const ProductListItemClient: React.FC<Props> = ({ product }) => {
  const itemClasses = 'w-1/4 flex justify-center items-center border-solid border-black border-r'

  return (
    <div className="flex justify-between items-center border-solid border-black border-2 cursor-pointer mb-2">
      <div className="w-1/4">
        <img src={product.image} alt={product.name} />
      </div>

      <div className={itemClasses}>
        <p className="font-bold">{product.name}</p>
      </div>

      <div className={itemClasses}>
        <p>{product.category}</p>
      </div>

      <div className="w-1/4 flex justify-center items-center">
        <p>{product.price}</p>
      </div>
    </div>
  )
}
