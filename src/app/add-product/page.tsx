import SubmitButton from "@/components/buttons/SubmitButton";
import prisma from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

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
      <form action={addProduct}>
        <input
          required
          type="text"
          name="name"
          placeholder="Name"
          className="input input-bordered mb-3 w-full" />

        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea-bordered textarea mb-3 w-full" />

        <input
          required
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          className="input input-bordered mb-3 w-full" />

        <input
          required
          type="number"
          name="price"
          placeholder="Price"
          className="input input-bordered mb-3 w-full" />

        <SubmitButton className="btn-block">Add Product</SubmitButton>
      </form>
    </>
  )
}

export default AddProductPage;
