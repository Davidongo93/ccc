'use client';

import { useEffect, useRef, useState } from 'react';
import { createCartAndSetCookie } from './actions';
import { useCart } from './cart-context';
import { CartDrawer } from './CartDrawer';
import OpenCart from './open-cart';
import { useAuth } from '../../hooks/useAuth';

export default function CartModal() {
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const { user } = useAuth();

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity]);

  return (
    <>
      <button 
        aria-label="Open cart" 
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <OpenCart quantity={cart?.totalQuantity} />
      </button>
      <CartDrawer 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        customerId={user?.shopifyCustomerId}
      />
    </>
  );
}
