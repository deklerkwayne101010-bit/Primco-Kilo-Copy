import React from 'react';
import { ProductGraphic } from './ProductGraphic';

interface ProductImageProps {
  sku: string;
  category: string;
  name: string;
  image?: string;
  imageAlt?: string;
  className?: string;
}

/**
 * Renders a product's real photo when one was imported (e.g. from
 * bulldogabrasives.co.za), falling back to the studio SVG graphic otherwise.
 */
export const ProductImage: React.FC<ProductImageProps> = ({
  sku,
  category,
  name,
  image,
  imageAlt,
  className = '',
}) => {
  if (image) {
    return (
      <img
        src={image}
        alt={imageAlt || name}
        className={`w-full h-full object-cover ${className}`}
        loading="lazy"
        decoding="async"
      />
    );
  }
  return (
    <ProductGraphic
      sku={sku}
      category={category}
      name={name}
      className={className}
    />
  );
};
