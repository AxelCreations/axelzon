import PaginationBar from '@/components/Paginationbar';
import ProductCard from '@/components/ProductCard';
import NewProductButton from '@/components/buttons/NewProductButton';
import prisma from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { authOptions } from './api/auth/[...nextauth]/route';

type HomeProps = {
  searchParams: { page: string };
}

const Home = async ({ searchParams: { page = '1' } }: HomeProps) => {
  const session = await getServerSession(authOptions);
  const currentPage = parseInt(page);
  const pageSize = 6;

  const totalProducts = await prisma.product.count();
  const totalPages = Math.ceil((totalProducts) / pageSize);

  const [firstProduct, ...products] = await prisma.product.findMany({
    orderBy: { id: 'desc' },
    skip: (currentPage - 1) * pageSize,
    take: pageSize + 1,
  });

  return (
    <div className='flex flex-col items-center'>
      {session?.user && <NewProductButton className='my-5 self-start sm:self-center' />}
      <div className='hero rounded-xl bg-base-200'>
        <div className='hero-content flex-col lg:flex-row'>
          <Image
            src={firstProduct.imageUrl}
            alt={firstProduct.name}
            height={400}
            width={400}
            className='w-full max-w-sm max-h-[400px] min-h-[400px] rounded-lg shadow-2xl object-cover'
            priority
          />
          <div>
            <h1 className='text-5xl font-bold'>{firstProduct.name}</h1>
            <p className='py-6'>{firstProduct.description}</p>
            <Link
              href={`/products/${firstProduct.id}`}
              className='btn btn-primary'
            >
              Take a Look
            </Link>
          </div>
        </div>
      </div>

      {totalPages > 1 &&
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      }

      <div className='my-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 px-1 sm:px-0'>
        {products.map(product => <ProductCard product={product} key={product.id} />)}
      </div>

      {totalPages > 1 &&
        <PaginationBar className='lg:hidden' currentPage={currentPage} totalPages={totalPages} />
      }
    </div>
  )
}

export default Home;