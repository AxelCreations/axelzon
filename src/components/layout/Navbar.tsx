import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/next.svg';
import { redirect } from 'next/navigation';
import { getCart } from '@/lib/db/cart';
import ShoppingCartButton from '../buttons/ShoppingCartButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import UserMenuButton from '../buttons/UserMenuButton';

export const searchProducts = async (formData: FormData): Promise<void> => {
  "use server";

  const searchQuery = formData.get('searchQuery')?.toString();

  if (searchQuery) {
    redirect(`/search?query=${searchQuery}`);
  }
}

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  const cart = await getCart();

  return (
    <div className='bg-base-100'>
      <div className="navbar max-w-7xl m-auto flex-col sm:flex-row">
        <div className="flex-1">
          <Link href="/" className='btn btn-ghost'>
            <Image src={logo} height={40} width={120} alt='Axelzon logo' />
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProducts}>
            <div className="form-control">
              <input 
                type="text"
                name='searchQuery'
                className='input input-bordered w-full min-w-[150px]'
                placeholder='Search'
                required />
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
      </div>
    </div>
  )
}

export default Navbar;