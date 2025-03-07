import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../../hooks/useCart';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface Product {
  id: string;
  title: string;
  handle: string;
  images: Array<{ url: string }>;
  priceRange: {
    minVariantPrice: {
      amount: string;
    };
  };
  variants: Array<{
    id: string;
    price: {
      amount: string;
    };
  }>;
}

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    try {
      const variant = product.variants[0]; // Usando la primera variante por defecto
      addToCart({
        variantId: variant.id,
        quantity: 1,
        title: product.title,
        price: parseFloat(variant.price.amount),
        image: product.images[0]?.url
      });
      toast.success('Producto agregado al carrito');
    } catch (error) {
      toast.error('Error al agregar al carrito');
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="group relative">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <Link href={`/product/${product.handle}`} className="relative h-full w-full object-cover">
          {product.images[0] && (
            <Image
              src={product.images[0].url}
              alt={product.title}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover"
            />
          )}
        </Link>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/product/${product.handle}`}>{product.title}</Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            ${parseFloat(product.priceRange.minVariantPrice.amount).toLocaleString()}
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          {isAdding ? 'Agregando...' : 'Agregar'}
        </button>
      </div>
    </div>
  );
} 