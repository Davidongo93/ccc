/**
 * @fileoverview Navbar component for the storefront landing page.
 * This component includes both desktop and mobile navigation menus.
 * 
 * @component
 * @example
 * return (
 *   <Navbar />
 * )
 */

'use client'
import { Menu, Search, ShoppingCart, User, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"

/**
 * Navbar component that renders a navigation bar with links to different sections of the website.
 * It includes a logo, desktop menu, and a mobile menu with a toggle button.
 * 
 * @returns {JSX.Element} The rendered Navbar component.
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [cartItemsCount, setCartItemsCount] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  
  const updateCartCount = () => {
    const cart = localStorage.getItem('cart')
    if (cart) {
      try {
        const cartItems = JSON.parse(cart)
        const itemCount = Array.isArray(cartItems) 
          ? cartItems.reduce((total, item) => total + (item.quantity || 0), 0)
          : 0
        setCartItemsCount(itemCount)
      } catch (error) {
        console.error('Error parsing cart data:', error)
        setCartItemsCount(0)
      }
    } else {
      setCartItemsCount(0)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Ignorar clics en el botón de búsqueda y en el input
      if (
        target.closest('button')?.getAttribute('aria-label') === 'Toggle search' ||
        target === searchInputRef.current ||
        target.closest('form')
      ) {
        return;
      }

      // Solo cerramos si el clic fue fuera del menú de búsqueda
      if (searchRef.current && !searchRef.current.contains(target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Actualizar el contador inicial
    updateCartCount()

    // Escuchar cambios en localStorage de otras ventanas
    window.addEventListener('storage', updateCartCount)

    // Escuchar cambios en localStorage de la misma ventana
    const originalSetItem = localStorage.setItem
    localStorage.setItem = function(key: string, value: string) {
      const event = new Event('localStorageChange')
      originalSetItem.apply(this, [key, value])
      window.dispatchEvent(event)
    }

    window.addEventListener('localStorageChange', updateCartCount)

    // Escuchar el evento personalizado para actualizaciones del carrito
    window.addEventListener('cartUpdated', updateCartCount)

    return () => {
      window.removeEventListener('storage', updateCartCount)
      window.removeEventListener('localStorageChange', updateCartCount)
      window.removeEventListener('cartUpdated', updateCartCount)
      localStorage.setItem = originalSetItem
    }
  }, [])

  const checkAuthentication = () => {
    const token = localStorage.getItem('token');
    console.log('Token en localStorage:', token); // Debug log
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    // Verificar autenticación inicial
    checkAuthentication();

    // Verificar cada vez que el componente se monta o actualiza
    const interval = setInterval(checkAuthentication, 1000);

    // Verificar cuando la ventana obtiene el foco
    const handleFocus = () => {
      checkAuthentication();
    };

    // Verificar cuando hay cambios en localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token') {
        checkAuthentication();
      }
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authStateChanged', checkAuthentication);

    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authStateChanged', checkAuthentication);
    };
  }, []);

  const handleAuthClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/profile');
    } else {
      router.push('/login');
    }
  };

  /**
   * Toggles the mobile menu open and closed.
   */
  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchTerm.trim())}`
      setIsSearchOpen(false)
      setSearchTerm("")
    }
  }

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Colombian Cannabis Center"
                width={180}
                height={50}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-green-600">
              Inicio
            </Link>
            <Link href="/nosotros" className="text-gray-700 hover:text-green-600">
              Nosotros
            </Link>
            <Link href="/#ofrecemos" className="text-gray-700 hover:text-green-600">
              Ofrecemos
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-green-600">
              Productos
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-green-600">
              Contacto
            </Link>
            <div className="relative" ref={searchRef}>
              <button
                onClick={toggleSearch}
                className="text-gray-700 hover:text-green-600 focus:outline-none"
                aria-label="Toggle search"
              >
                <Search className="h-6 w-6" />
              </button>
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg overflow-hidden z-20">
                  <form onSubmit={handleSearch} className="p-2">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Buscar..."
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </form>
                </div>
              )}
            </div>
            <Link href="/cart" className="text-gray-700 hover:text-green-600 relative">
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <button 
              onClick={handleAuthClick}
              className="text-gray-700 hover:text-green-600 relative group"
            >
              <User className="h-6 w-6" />
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {isAuthenticated ? 'Mi Perfil' : 'Login'}
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
          <button
              onClick={toggleSearch}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
              aria-label="Toggle search"
            >
              <Search className="h-6 w-6" />
            </button>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
            <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-green-600">
              Inicio
            </Link>
            <Link href="/nosotros" className="block px-3 py-2 text-gray-700 hover:text-green-600">
              Nosotros
            </Link>
            <Link href="/#ofrecemos" className="block px-3 py-2 text-gray-700 hover:text-green-600">
              Ofrecemos
            </Link>
            <Link href="/products" className="block px-3 py-2 text-gray-700 hover:text-green-600">
              Productos
            </Link>
            <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:text-green-600">
              Contacto
            </Link>
            <Link href="/products" className="flex items-center px-3 py-2 text-gray-700 hover:text-green-600">
              <div className="relative">
                <ShoppingCart className="h-6 w-6 mr-2" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <span>Carrito</span>
            </Link>
            <button 
              onClick={handleAuthClick}
              className="flex items-center px-3 py-2 text-gray-700 hover:text-green-600 w-full text-left"
            >
              <User className="h-6 w-6 mr-2" />
              <span>{isAuthenticated ? 'Mi Perfil' : 'Login'}</span>
            </button>
          </div>
        </div>
      )}

       {/* Mobile search */}
       {isSearchOpen && (
        <div className="md:hidden px-4 py-2 bg-white" ref={searchRef}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar..."
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </form>
        </div>
      )}
    </nav>
  )
}
export default Navbar;

