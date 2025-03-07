import { useState } from 'react';

interface FilterOption {
  name: string;
  values: string[];
}

interface ProductFiltersProps {
  options: FilterOption[];
  onFilterChange: (filters: { [key: string]: string[] }) => void;
  onClose?: () => void;
}

export default function ProductFilters({ options, onFilterChange, onClose }: ProductFiltersProps) {
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});

  const handleFilterChange = (category: string, value: string) => {
    const newFilters = { ...selectedFilters };
    
    if (!newFilters[category]) {
      newFilters[category] = [];
    }

    const valueIndex = newFilters[category].indexOf(value);
    if (valueIndex === -1) {
      newFilters[category].push(value);
    } else {
      newFilters[category].splice(valueIndex, 1);
    }

    if (newFilters[category].length === 0) {
      delete newFilters[category];
    }

    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="w-full p-4 bg-white border border-[#2f450d]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-[#2f450d]">Filtrar por</h2>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors border border-[#2f450d]"
            aria-label="Cerrar filtros"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#2f450d"
              className="w-6 h-6"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      {options.map((option) => (
        <div key={option.name} className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-2">{option.name}</h3>
          <div className="space-y-2">
            {option.values.map((value) => (
              <label key={value} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                  checked={selectedFilters[option.name]?.includes(value) || false}
                  onChange={() => handleFilterChange(option.name, value)}
                />
                <span className="ml-2 text-sm text-gray-600">{value}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 