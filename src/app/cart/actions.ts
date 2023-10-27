'use server';

import { getCart, createCart } from '@/lib/db/cart';
import prisma from '@/lib/db/prisma';
import { revalidatePath } from 'next/cache';

export const setProductQuantity = async (productId: string, quantity: number): Promise<void> => {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find(item => item.productId === productId);

  if (articleInCart) {
    if (quantity === 0) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            delete: { id: articleInCart.id }
          }
        }
      });
    } else {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            update: {
              where: { id: articleInCart.id },
              data: {
                quantity
              }
            }
          }
        }
      });
    }
  }

  revalidatePath('/cart', 'page');
}
