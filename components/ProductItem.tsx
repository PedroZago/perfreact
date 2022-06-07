import React, { memo, useState } from 'react';
import dynamic from 'next/dynamic';
import { AddProductToWishlistProps } from './AddProductToWishlist';

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(
  () => import('./AddProductToWishlist')
    .then((mod) => mod.AddProductToWishlist),
  {
    loading: () => <span>Carregando...</span>,
  },
);

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  };
  onAddToWishList: (_id: number) => Promise<void>;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  return (
    <div>
      {product.title}
      {' '}
      -
      {' '}
      <strong>{product.priceFormatted}</strong>

      <button type="button" onClick={() => setIsAddingToWishlist(true)}>Adicionar aos favoritos</button>

      {
        isAddingToWishlist
        && (
          <AddProductToWishlist
            onAddToWishlist={() => onAddToWishList(product.id)}
            onRequestClose={() => setIsAddingToWishlist(false)}
          />
        )
      }

    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => Object.is(prevProps.product, nextProps.product),
);
