import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db/prisma";

type SearchPageProps = {
  searchParams: {
    query: string;
    page: string;
  };
}

export const generateMetadata = ({searchParams: { query }}: SearchPageProps) => {
  return {
    title: `Searching: ${query} - Axelzon`
  }
}

const SearchPage = async ({ searchParams: { query, page = '1' } }: SearchPageProps) => {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ]
    },
    orderBy: { id: 'desc' },
    take: 10
  });

  if (products.length === 0) {
    return <div className="font-bold text-center">No products found.</div>
  }

  return (
    <>
      <h1 className="text-lg pt-10">Searching for: <strong>{query}</strong> | ({products.length}) products found.</h1>
      <div className='my-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
        {products.map(product => <ProductCard product={product} key={product.id} />)}
      </div>
    </>
  )
}

export default SearchPage;