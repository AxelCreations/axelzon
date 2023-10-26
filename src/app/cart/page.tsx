import CartEntry from "@/components/CartEntry";
import { getCart } from "@/lib/db/cart";
import { setProductQuantity } from "./actions";
import { formatPrice } from "@/lib/format";
import Link from "next/link";

export const metadata = {
  title: 'My cart - Axelzon',
}

const CartPage = async () => {
  const cart = await getCart();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      {cart?.items.map(cartItem => (
        <>
          <CartEntry
            key={cartItem.id}
            cartItem={cartItem}
            setProductQuantity={setProductQuantity} />
        </>
      ))}

      {!cart?.items.length && (
        <div className="empty-cart mb-10">
          <p>Cart is empty</p>
          <Link href='/' className="btn btn-secondary btn-sm mt-2">Go shopping</Link>
        </div>
      )}

      {cart?.items.length && (
        <div className="flex flex-row justify-between items-center md:flex-col gap-5">
          <p className="p-4 font-bold bg-base-100 badge badge-ghost">
            Total: {formatPrice(cart?.subtotal || 0)}
          </p>
          <button className="btn btn-primary md:w-[250px]">Checkout</button>
        </div>
      )}
    </div>
  )
}

export default CartPage;