import Link from 'next/link'

import { Product } from 'types/Product'

type Props = {
  product: Product
}

export const ProductListItemAdmin: React.FC<Props> = ({ product }) => {
  const itemClasses = 'w-1/4 flex justify-center items-center border-solid border-black border-r h-auto'

  return (
    <Link href={`/admin/products/${product.id}`}>
      <div className="flex justify-between items-center border-solid border-black border-2 cursor-pointer mb-2">
        <div className="w-1/4">
          <img src={product.image} alt={product.name} />
        </div>

        <div className={itemClasses}>
          <p className="font-bold">{product.name}</p>
        </div>

        <div className={itemClasses}>
          <p>{product.category?.name || '-'}</p>
        </div>

        <div className={itemClasses}>
          <p>{product.price}</p>
        </div>

        <div className="w-1/4 flex justify-center items-center h-auto">
          <p>{product.stock}</p>
        </div>
      </div>
    </Link>
  )
}
