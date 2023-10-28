import CartEntry from "@/components/CartEntry";
import { getCart } from "@/lib/db/cart";
import { setProductQuantity } from "./actions";
import { formatPrice } from "@/lib/format";
import Link from "next/link";

export const metadata = {
  title: 'My cart - AxelZon',
}

const CartPage = async () => {
  const cart = await getCart();

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>

      {cart?.items.length && (
        <div className="flex flex-col md:flex-row">
          <div className="w-full">
            {cart?.items.map(cartItem => (
              <CartEntry
                key={cartItem.id}
                cartItem={cartItem}
                setProductQuantity={setProductQuantity} />
            ))}
          </div>
          <div className="flex justify-center md:w-[400px]">
            <div className="flex flex-col items-center gap-5 md:fixed">
              <p className="p-4 font-bold bg-base-100 badge badge-ghost">
                Total: {formatPrice(cart?.subtotal || 0)}
              </p>
              <button className="btn btn-primary w-[250px] cursor-not-allowed">Checkout</button>
            </div>
          </div>
        </div>
      )}

      {!cart?.items.length && (
        <div className="empty-cart mb-10">
          <p>Cart is empty</p>
          <Link href='/' className="btn btn-secondary btn-sm mt-2">Go shopping</Link>
        </div>
      )}
    </>
  )
}

export default CartPage;