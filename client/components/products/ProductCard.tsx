import Link from 'next/link'

import { Product } from 'types/Product'

type Props = {
  product: Product
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="cursor-pointer shadow-md">
        <img
          style={{ width: '100%', height: '135px' }}
          className="object-cover"
          src={product.image}
          alt={product.name}
        />

        <div className="mt-1 p-3">
          <p className="font-bold">{product.name}</p>
          <p>{product.price} PLN</p>
        </div>
      </div>
    </Link>
  )
}
