
import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AddProductForm from "@/components/forms/AddProductForm";

export const metadata = {
  title: 'Add Product - AxelZon',
}

async function addProduct(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/add-product')
  }

  const name = formData.get('name')?.toString();
  const description = formData.get('description')?.toString();
  const imageUrl = formData.get('imageUrl')?.toString();
  const price = Number(formData.get('price') || 0);

  if ( !name || !description || !imageUrl || !price ) {
    throw Error('Missing required fields');
  }

  await prisma.product.create({
    data: {name, description, imageUrl, price}
  });

  redirect('/');
}

const AddProductPage = async (): Promise<JSX.Element> => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin/?callbackUrl=/add-product');
  }
  
  return (
    <>
      <h1 className="mb-3 text-xl font-bold">Add Product</h1>
      <AddProductForm addProductAction={addProduct} />
    </>
  )
}

export default AddProductPage;
