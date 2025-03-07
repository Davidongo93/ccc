import { useAuth } from '@/hooks/useAuth';
import { CartDrawer } from './CartDrawer';

export function CartModal() {
  const { user } = useAuth();

  return (
    <CartDrawer customerId={user?.shopifyCustomerId} />
  );
} 