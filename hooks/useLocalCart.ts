import { useEffect, useState } from 'react';

interface CartItem {
  variantId: string;
  quantity: number;
  title: string;
  price: number;
  image: string;
}

export const useLocalCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Cargar items del localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('localCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Guardar en localStorage cada vez que el carrito cambie
  useEffect(() => {
    localStorage.setItem('localCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToLocalCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(i => i.variantId === item.variantId);
      
      if (existingItemIndex >= 0) {
        // Si el item ya existe, actualizar la cantidad
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];
        if (existingItem) {
          existingItem.quantity += item.quantity;
        }
        return updatedItems;
      } else {
        // Si es un nuevo item, añadirlo al array
        return [...prevItems, item];
      }
    });
  };

  const removeFromLocalCart = (variantId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.variantId !== variantId));
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.variantId === variantId ? { ...item, quantity } : item
      )
    );
  };

  const clearLocalCart = () => {
    setCartItems([]);
    localStorage.removeItem('localCart');
  };

  return {
    cartItems,
    addToLocalCart,
    removeFromLocalCart,
    updateQuantity,
    clearLocalCart,
  };
}; 