import { Product } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';
import PriceTag from './PriceTag';


type ProductCardProps = {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isNew = (Date.now() - new Date(product.createdAt).getTime()) < (1000 * 60 * 60 * 24 * 7);
  const previewImage = 'https://images.unsplash.com/photo-1663465374413-83cba00bff6f?auto=format&fit=crop&q=80&w=2080&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <Link
      href={Boolean(product.id.length) ? `/products/${product.id}` : '#'}
      className='card w-full bg-base-100 hover:shadow-xl transition:shadow'>
      <figure>
        <Image
          src={product.imageUrl || previewImage}
          alt={product.name}
          height={400}
          width={800}
          className='h-[400px] object-cover min-h=[400px]'
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