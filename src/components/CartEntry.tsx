'use client';

import { CartItemWithProduct } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

type CartEntryProps = {
  cartItem: CartItemWithProduct;
  setProductQuantity: (productId: string, quantity: number) => Promise<void>;
}

const CartEntry = ({ cartItem: { product, quantity }, setProductQuantity }: CartEntryProps) => {
  const [isPending, startTransition] = useTransition();

  const quantityOptions: JSX.Element[] = [];
  
  for (let i = 0; i < 100; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
        {(i === 0) ? ' (Remove)' : ''}
      </option>
    )
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
        <Image 
          src={product.imageUrl}
          alt={product.name}
          height={250}
          width={250}
          className="rounded-lg max-h-[250px] object-cover"
        />
        <div>
          <Link href={`/products/${product.id}`} className="font-bold">
            {product.name}
          </Link>
          <div>Price: {formatPrice(product.price)}</div>
          <div className="my-1 flex items-center gap-2">
            Quantity:
            <select 
              className="select select-bordered w-full max-w-[120px]"
              defaultValue={quantity}
              onChange={e => {
                const newQuantity = parseInt(e.currentTarget.value);

                if ( newQuantity >= 0 ) {
                  startTransition(async () => {
                    await setProductQuantity(product.id, newQuantity);
                  });
                }
              }}
            >
              {quantityOptions}
            </select>
          </div>
          <div className="flex items-center gap-3">
            Total: {formatPrice(product.price * quantity)}
            {isPending && <span className='loading loading-spinner loading-sm' />}
          </div>
        </div>
      </div>
      <div className="divider" />
    </>
  )
}

export default CartEntry;