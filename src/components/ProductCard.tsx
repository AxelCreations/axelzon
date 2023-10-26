import { Product } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';
import PriceTag from './PriceTag';


type ProductCardProps = {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isNew = (Date.now() - new Date(product.createdAt).getTime()) < (1000 * 60 * 60 * 24 * 7);

  return (
    <Link
      href={'/products/' + product.id}
      className='card w-full bg-base-100 hover:shadow-xl transition:shadow'>
      <figure>
        <Image 
          src={product.imageUrl}
          alt={product.name}
          height={400}
          width={800}
          className='h-48 object-cover'
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>
          {product.name}
          {isNew && <span className='badge badge-secondary'>NEW</span>}
        </h2>
        <p>{product.description}</p>
        <PriceTag price={product.price} />
      </div>
    </Link>
  )
}

export default ProductCard;