'use client';
/**
 * Ofrecemos component renders a section displaying a list of products with a slider.
 * Each product includes an image, name, description, and an "Agregar al Carrito" button.
 *
 * @component
 * @example
 * return (
 *   <Products />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * This component uses the `react-slick` library for the slider functionality and `next/image` for optimized image rendering.
 *
 * @see https://react-slick.neostack.com/ for more information on the slider settings.
 */

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

interface Product {
  id: string;
  title: string;
  description: string;
  handle: string;
  featuredImage?: {
    url: string;
  };
}

function Ofrecemos() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products/featured');
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  if (loading) {
    return (
      <section id='ofrecemos' className='bg-gray-50 py-20'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mb-8 text-center'>
            <h2 className='mb-4 text-3xl font-bold text-gray-900 md:text-4xl'>Productos y Servicios Medicinales</h2>
            <p className='text-xl text-gray-600'>Conoce lo mejor en productos y servicios para tu bienestar.</p>
          </div>
          <div className="flex justify-center">
            <div className="animate-pulse">Cargando productos...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id='ofrecemos' className='bg-gray-50 py-20'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-8 text-center'>
          <h2 className='mb-4 text-3xl font-bold text-gray-900 md:text-4xl'>Productos y Servicios Medicinales</h2>
          <p className='text-xl text-gray-600'>Conoce lo mejor en productos y servicios para tu bienestar.</p>
        </div>

        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className='px-2'>
              <div className='overflow-hidden rounded-lg bg-white shadow-lg'>
                <div className='relative h-64'>
                  <Image 
                    src={product.featuredImage?.url || "/placeholder.svg"} 
                    alt={product.title} 
                    fill 
                    className='object-cover' 
                  />
                </div>
                <div className='p-6'>
                  <h3 className='mb-2 text-xl font-semibold text-gray-900'>{product.title}</h3>
                  <p className='mb-4 text-gray-600'>{product.description}</p>
                  <Link href={`/product/${product.handle}`}>
                    <button type="button" className='w-full rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700'>
                      Agregar al Carrito
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default Ofrecemos;

