'use client';

import type { Product } from 'lib/shopify/types';
import { useState } from 'react';
import ProductFilters from './product-filters';
import ProductGrid from './product-grid';

interface FilteredProductsProps {
  products: Product[];
  filterOptions: Array<{ name: string; values: string[] }>;
}

export default function FilteredProducts({ products, filterOptions }: FilteredProductsProps) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = (filters: { [key: string]: string[] }) => {
    if (Object.keys(filters).length === 0) {
      setFilteredProducts(products);
      return;
    }

    const newFilteredProducts = products.filter(product => {
      // Verificar cada categoría de filtro
      for (const [category, selectedValues] of Object.entries(filters)) {
        const productOption = product.options.find(opt => opt.name === category);
        if (!productOption) return false;

        // Verificar si el producto tiene al menos uno de los valores seleccionados
        const hasMatchingValue = selectedValues.some(value => 
          productOption.values.includes(value)
        );
        if (!hasMatchingValue) return false;
      }
      return true;
    });

    setFilteredProducts(newFilteredProducts);
  };

  return (
    <div>
      {/* Botón de filtro móvil */}
      <div className="md:hidden flex justify-center mb-4">
        <button
          type="button"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#2f450d] text-[#2f450d]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          Filtrar
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Panel de filtros unificado */}
        <div className={`
          md:block
          md:relative
          md:top-auto md:left-auto md:right-auto
          z-50 md:z-auto
          bg-white
          w-full md:w-auto
          md:h-auto
          overflow-hidden
          transition-all duration-300 ease-in-out
          ${isFilterOpen 
            ? 'max-h-[1000px] opacity-100 visible' 
            : 'max-h-0 opacity-0 invisible md:visible md:opacity-100 md:max-h-[1000px] pointer-events-none md:pointer-events-auto'
          }
          origin-top
          mb-4 md:mb-0
          flex justify-center md:justify-start
        `}>
          <div className={`
            w-[90%] md:w-full
            transition-all duration-300 ease-in-out
            transform
            ${isFilterOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 md:translate-y-0 md:opacity-100'}
          `}>
            <ProductFilters 
              options={filterOptions}
              onFilterChange={handleFilterChange}
              onClose={() => setIsFilterOpen(false)}
            />
          </div>
        </div>

        <div className={`
          flex-1
          transition-all duration-300 ease-in-out
          transform md:transform-none
          ${isFilterOpen ? 'translate-y-0' : '-translate-y-4'}
        `}>
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
} 