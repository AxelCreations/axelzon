'use client';

import SubmitButton from '@/components/buttons/SubmitButton';
import { Product } from '@prisma/client';
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import z from 'zod';

type AddProductFormProps = {
  addProductAction: (data: FormData) => Promise<void>;
}

export const ProductSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().url(),
  price: z.number(),
});

const EmptyProduct: Product = {
  id: '',
  description: '',
  imageUrl: '',
  name: '',
  price: 0,
  createdAt: new Date(),
  updatedAt: new Date()
}

const AddProductForm = ({ addProductAction }: AddProductFormProps) => {
  const [productPreview, setProductPreview] = useState(EmptyProduct);
  const [imageError, setImageError] = useState('');

  const handlePreviewChange = (field: string, value: any) => {
    if (field === 'imageUrl') {
      try {
        ProductSchema.shape.imageUrl.parse(value);
        setImageError('');
      } catch (err) {
        setImageError('Invalid URL.')
        return;
      }
    }

    setProductPreview({ ...productPreview, [field]: value });
  }

  return (
    <div className='flex flex-col md:flex-row gap-2 lg:gap-14'>
      <form action={addProductAction} className='flex flex-col w-full md:max-w-[50%]'>
        <input
          required
          type="text"
          name="name"
          placeholder="Name"
          className="input input-bordered mb-3 w-full"
          onChange={event => handlePreviewChange('name', event.target.value)} />

        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea-bordered textarea mb-3 w-full"
          onChange={event => handlePreviewChange('description', event.target.value)} />

        <input
          required
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          className={`input input-bordered w-full ${Boolean(imageError.length) ? 'mb-1' : 'mb-3'}`}
          onChange={event => handlePreviewChange('imageUrl', event.target.value)} />

        {Boolean(imageError.length) && <span className='block ps-1 mb-5 text-error text-sm'>{imageError}</span>}

        <input
          required
          type="number"
          name="price"
          placeholder="Price"
          className="input input-bordered mb-3 w-full"
          onChange={event => handlePreviewChange('price', event.target.value)} />

        <SubmitButton className="btn-block">Add Product</SubmitButton>
      </form>
      <div className="flex w-full md:max-w-[50%]">
        {(Boolean(productPreview.name.length) || Boolean(productPreview.description.length)) ?
          <ProductCard product={productPreview} />
          :
          <p>Create your Product...</p>
        }
      </div>
    </div>
  )
}

export default AddProductForm;