import Link from 'next/link'

import { Product } from 'types/Product'

type Props = {
  product: Product
}

export const ProductListItem: React.FC<Props> = ({ product }) => {
  const itemClasses = 'w-1/4 flex justify-center items-center border-solid border-black border-r h-auto'

  return (
    <Link href={`/admin/products/${product.id}`}>
      <div className="flex justify-between items-center border-solid border-black border-2 cursor-pointer">
        <div className="w-1/4">
          <img src={product.image} alt={product.name} />
        </div>

        <div className={itemClasses}>
          <p className="font-bold">{product.name}</p>
        </div>

        <div className={itemClasses}>
          <p>{product.category}</p>
        </div>

        <div className={itemClasses}>
          <p>{product.price}</p>
        </div>

        <div className={itemClasses}>
          <p>{product.stock}</p>
        </div>
      </div>
    </Link>
  )
}