import { useState, useEffect } from 'react';
import { API_ROUTES } from '../config/api.config';
import { toast } from 'react-hot-toast';

interface StockInfo {
  id: string;
  quantityAvailable: number;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
}

export const useStock = (variantIds: string[]) => {
  const [stockInfo, setStockInfo] = useState<StockInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStockInfo = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No se encontró el token de autenticación');
      }
      
      const response = await fetch(API_ROUTES.PRODUCTS.STOCK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ variantIds })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error al obtener información de stock: ${response.status}`);
      }

      const data = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Formato de respuesta inválido');
      }
      
      setStockInfo(data);
      setError(null);
    } catch (err) {
      console.error('Error al verificar stock:', err);
      setError(err instanceof Error ? err.message : 'Error al verificar el stock');
      toast.error('Error al verificar el stock disponible');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (variantIds.length > 0) {
      fetchStockInfo();
    } else {
      setIsLoading(false);
    }
  }, [variantIds.join(',')]);

  const getStockForVariant = (variantId: string) => {
    return stockInfo.find(stock => stock.id === variantId);
  };

  return {
    stockInfo,
    isLoading,
    error,
    getStockForVariant,
    refreshStock: fetchStockInfo
  };
}; 