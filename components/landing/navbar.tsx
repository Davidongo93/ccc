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
import { useState } from "react"

/**
 * Navbar component that renders a navigation bar with links to different sections of the website.
 * It includes a logo, desktop menu, and a mobile menu with a toggle button.
 * 
 * @returns {JSX.Element} The rendered Navbar component.
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  /**
   * Toggles the mobile menu open and closed.
   */
  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen)

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
            <Link href="/galeria" className="text-gray-700 hover:text-green-600">
              Galería
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-green-600">
              Contacto
            </Link>
            <div className="relative">
              <button
                onClick={toggleSearch}
                className="text-gray-700 hover:text-green-600 focus:outline-none"
                aria-label="Toggle search"
              >
                <Search className="h-6 w-6" />
              </button>
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg overflow-hidden z-20">
                  <form onSubmit={(e) => e.preventDefault()} className="p-2">
                    <input
                      type="text"
                      placeholder="Buscar..."
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </form>
                </div>
              )}
            </div>
            <Link href="/products" className="text-gray-700 hover:text-green-600 relative group">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Tienda
              </span>
            </Link>
            <Link href="/login" className="text-gray-700 hover:text-green-600 relative group">
              <User className="h-6 w-6" />
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Login
              </span>
            </Link>
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
            <Link href="#galeria" className="block px-3 py-2 text-gray-700 hover:text-green-600">
              Galería
            </Link>
            <Link href="/contact" className="block px-3 py-2 text-gray-700 hover:text-green-600">
              Contacto
            </Link>
            <Link href="/products" className="flex items-center px-3 py-2 text-gray-700 hover:text-green-600">
              <ShoppingCart className="h-6 w-6 mr-2" />
            </Link>
            <Link href="/login" className="flex items-center px-3 py-2 text-gray-700 hover:text-green-600">
              <User className="h-6 w-6 mr-2" />
            </Link>
          </div>
        </div>
      )}

       {/* Mobile search */}
       {isSearchOpen && (
        <div className="md:hidden px-4 py-2 bg-white">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
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

