import { toast } from "react-hot-toast";
import { API_ROUTES } from "../config/api.config";
import { useAuth } from "./useAuth";

export const useShopifyOrder = () => {
  const { user } = useAuth();

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const getPaymentUrl = async (orderId: string): Promise<string> => {
    try {
      if (!user) {
        throw new Error('Debes iniciar sesión para realizar el pago');
      }

      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/orders/create-checkout/${orderId}`, {
        method: 'POST',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al obtener la URL de checkout');
      }

      const { checkoutUrl } = await response.json();
      return checkoutUrl;
    } catch (error) {
      console.error('Error al obtener URL de checkout:', error);
      toast.error(error instanceof Error ? error.message : 'Error al procesar el pago');
      throw error;
    }
  };

  return {
    getPaymentUrl
  };
}; 