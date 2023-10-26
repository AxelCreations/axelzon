'use client';

import { ShoppingCart } from '@/lib/db/cart';
import { formatPrice } from '@/lib/format';
import Link from 'next/link';

type ShoppingCartButtonProps = {
  cart: ShoppingCart | null;
}

const ShoppingCartButton = ({ cart }: ShoppingCartButtonProps) => {
  const closeDropdown = () => {
    const element: HTMLElement = document.activeElement as HTMLElement;
    if (element) {
      element.blur();
    }
  }

  return (
    <div className='dropdown dropdown-end'>
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <div className='w-6'>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
              <path 
                fill="currentColor"
                d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
            </svg>
            <span className='badge badge-sm indicator-item'>
              {cart?.size || 0}
            </span>
          </div>
        </div>
      </label>
      <div
        tabIndex={0}
        className="card dropdown-content card-compact mt-3 w-52 bg-base-100 shadow z-30">
          <div className="card-body">
            <span className="text-lg font-bold">{cart?.size || 0} Items</span>
            <span className="text-info">
              Subtotal: {formatPrice(cart?.subtotal || 0)}
            </span>
            <div className="card-actions">
              <Link 
                href='/cart'
                className='btn btn-primary btn-block'
                onClick={closeDropdown}
              >
                View Cart
              </Link>
            </div>
          </div>
      </div>
    </div>
  )
}

export default ShoppingCartButton;