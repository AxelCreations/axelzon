import { cookies } from 'next/headers';
import prisma from './prisma';
import { Cart, CartItem, Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export type CartWithProducts = Prisma.CartGetPayload<{
  include: { items: { include: { product: true } } }
}>

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true }
}>

export type ShoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
}

export const getCart = async (): Promise<ShoppingCart | null> => {
  const session = await getServerSession(authOptions);

  let cart: CartWithProducts | null;

  const localCartId = cookies().get('localCartId')?.value;

  if (session) {
    cart = await prisma.cart.findFirst({
      where: { userId: session.user.id },
      include: { items: { include: { product: true } } }
    });

  } else {
    cart = localCartId
      ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { items: { include: { product: true } } }
      })
      : null;
  }

  if (!cart) return null;

  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price, 0
    )
  }
}

export const createCart = async (): Promise<ShoppingCart> => {
  const session = await getServerSession(authOptions);

  let newCart: Cart;

  if (session) {
    newCart = await prisma.cart.create({
      data: { userId: session.user.id }
    });
  } else {
    newCart = await prisma.cart.create({
      data: {}
    });

    cookies().set('localCartId', newCart.id);
  }

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0
  }
}

export const mergeGuestCartIntoUserCart = async (userId: string) => {
  const localCartId = cookies().get('localCartId')?.value;

  const localCart = await prisma.cart.findUnique({
    where: { id: localCartId },
    include: { items: { include: { product: true } } }
  });

  if (!localCart) return;

  const userCart = await prisma.cart.findFirst({
    where: { userId },
    include: { items: { include: { product: true } } }
  });

  await prisma.$transaction(async tx => {
    if (userCart) {
      const mergedCartItems = mergeCartItems(userCart.items, localCart.items);

      const userCartId = userCart.id;

      await tx.cartItem.deleteMany({
        where: { cartId: userCartId }
      });

      await tx.cartItem.createMany({
        data: mergedCartItems.map(item => ({
          cartId: userCartId,
          productId: item.productId,
          quantity: item.quantity,
        }))
      });
    } else {
      await tx.cart.create({
        data: {
          userId,
          items: {
            createMany: {
              data: localCart?.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              }))
            }
          }
        }
      });
    }

    await tx.cart.delete({
      where: { id: localCart.id }
    });

    cookies().set('localCartId', "");
  });
}

const mergeCartItems = (...cartItems: CartItem[][]): CartItem[] => {
  return cartItems.reduce((acc, items) => {
    items.forEach(item => {
      const exists = acc.find((el) => el.productId === item.productId);
      if (exists) {
        exists.quantity += item.quantity;
      } else {
        acc.push(item);
      }
    });

    return acc;
  }, [] as CartItem[]);
}