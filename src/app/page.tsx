import PaginationBar from '@/components/Paginationbar';
import ProductCard from '@/components/ProductCard';
import prisma from '@/lib/db/prisma';
import Image from 'next/image';
import Link from 'next/link';

type HomeProps = {
  searchParams: { page: string };
}

const Home = async () => {
  const products = await prisma.product.findMany({
    orderBy: { id: 'desc' }
  });
  return (
    <div className='flex flex-col items-center'>
      <div className='hero rounded-xl bg-base-200'>
        <div className='hero-content flex-col lg:flex-row'>
          <Image
            src={products[0].imageUrl}
            alt={products[0].name}
            height={800}
            width={400}
            className='w-full max-w-sm rounded-lg shadow-2xl'
            priority
          />
          <div>
            <h1 className='text-5xl font-bold'>{products[0].name}</h1>
            <p className='py-6'>{products[0].description}</p>
            <Link
              href={`/products/${products[0].id}`}
              className='btn btn-primary'
            >
              Take a Look
            </Link>
          </div>
        </div>
      </div>

      <div className='my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
        {products.slice(1).map(product => <ProductCard product={product} key={product.id} />)}
      </div>

      <PaginationBar currentPage={13} totalPages={99} />
    </div>
  )
}

export default Home;