import prisma from '@/lib/db/prisma';
import { Product } from '@prisma/client';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import PriceTag from '@/components/PriceTag';
import { Metadata } from 'next';
import { cache } from 'react';
import AddToCartButton from '@/components/buttons/AddToCartButton';
import { incrementProductQuantity } from './actions';

type ProductPageProps = {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string): Promise<Product> => {
  const product: Product | null = await prisma.product.findUnique({ where: { id } });

  if (!product) notFound();

  return product;
});

export const generateMetadata = async ({ params: { id } }: ProductPageProps): Promise<Metadata> => {
  const product = await getProduct(id);

  return {
    title: `${product.name} - Axelzon`,
    description: product.description,
    openGraph: {
      images: [{url: product.imageUrl}],
    }
  }
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await getProduct(id);

  return (
    <div className='flex flex-col lg:flex-row gap-4'>
      <Image
        src={product.imageUrl}
        alt={product.name}
        height={500}
        width={500}
        className='rounded-lg object-contain max-h-[200px] lg:max-h-[500px]'
        priority
      />
      <div>
        <h1 className='text-5xl font-bold'>{product.name}</h1>
        <PriceTag price={product.price} className='mt-4' />
        <p className='py-6'>{product.description}</p>
        <AddToCartButton 
          productId={product.id} 
          incrementProductQuantity={incrementProductQuantity} />
      </div>
    </div>
  )
}

export default ProductPage;