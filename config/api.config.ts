// URL base de la API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// Definición de rutas de la API
const ROUTES = {
  PRODUCTS: 'products',
  PRODUCT_DETAILS: 'products/details',
  PRODUCT_VARIANTS: 'products/variants/stock',
  ORDERS: 'orders',
  PAYMENT: {
    SESSION: 'orders/payment-session'
  },
  AUTH: {
    REGISTER: 'auth/register',
    LOGIN: 'auth/login',
    ME: 'auth/me'
  }
} as const;

// Tipos para las rutas disponibles
type SimpleRoute = keyof Omit<typeof ROUTES, 'AUTH'>;
type AuthRoute = `AUTH.${keyof typeof ROUTES['AUTH']}`;
type ApiRoute = SimpleRoute | AuthRoute;

// Función interna para construir URLs base
function createBaseUrl(route: ApiRoute): string {
  const parts = route.split('.');
  if (parts.length === 2 && parts[0] === 'AUTH') {
    const authPath = ROUTES.AUTH[parts[1] as keyof typeof ROUTES['AUTH']];
    return `${API_BASE_URL}/${authPath}`;
  }
  
  const path = ROUTES[route as SimpleRoute];
  return `${API_BASE_URL}/${path}`;
}

// Función para obtener la URL base de la API
export const getApiBaseUrl = () => {
  // Si estamos en desarrollo y existe una URL de Ngrok en localStorage, usarla
  if (process.env.NEXT_PUBLIC_NODE_ENV === 'development' && typeof window !== 'undefined') {
    const ngrokUrl = window.localStorage.getItem('ngrok_url');
    if (ngrokUrl) {
      return ngrokUrl;
    }
  }
  return API_BASE_URL;
};

// URLs pre-construidas para uso común
export const API_ROUTES = {
  PRODUCTS: {
    LIST: `${getApiBaseUrl()}/products`,
    DETAILS: `${getApiBaseUrl()}/products/details`,
    STOCK: `${getApiBaseUrl()}/products/stock`
  },
  ORDERS: {
    BASE: `${getApiBaseUrl()}/orders`,
    CREATE: `${getApiBaseUrl()}/orders`,
    LIST: `${getApiBaseUrl()}/orders`,
    PAYMENT_SESSION: `${getApiBaseUrl()}/orders/payment-session`,
    CREATE_CHECKOUT: (orderId: string) => `${getApiBaseUrl()}/orders/create-checkout/${orderId}`
  },
  AUTH: {
    REGISTER: `${getApiBaseUrl()}/auth/register`,
    LOGIN: `${getApiBaseUrl()}/auth/login`,
    ME: `${getApiBaseUrl()}/auth/me`
  },
  REGISTER: `${getApiBaseUrl()}/auth/register`,
  LOGIN: `${getApiBaseUrl()}/auth/login`,
  ME: `${getApiBaseUrl()}/auth/me`,
  CART: {
    ADD: `${getApiBaseUrl()}/cart/add`,
    REMOVE: `${getApiBaseUrl()}/cart/remove`,
    UPDATE: `${getApiBaseUrl()}/cart/update`,
    GET: `${getApiBaseUrl()}/cart`
  }
} as const;

// Función para construir URLs con parámetros
export function createApiUrl(route: ApiRoute, params?: Record<string, string>): string {
  let url = createBaseUrl(route);
  
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    url += `?${queryString}`;
  }
  
  return url;
}

// Exportar todo lo necesario
export type { ApiRoute };
export { createApiUrl as buildApiUrl }; 
