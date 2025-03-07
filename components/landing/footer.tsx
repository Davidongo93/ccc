import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and description */}
          <div className="space-y-4">
            <Image
              src="/images/logo.png"
              alt="Colombian Cannabis Center"
              width={180}
              height={50}
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="text-gray-400">
              Dedicados a proporcionar productos de cannabis medicinal de la más alta calidad para
              tu bienestar.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-green-500" />
                <a href="tel:+573001234567" className="text-gray-400 hover:text-white">
                  +57 300 123 4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-green-500" />
                <a
                  href="mailto:info@colombiancannabiscenter.com"
                  className="text-gray-400 hover:text-white"
                >
                  info@colombiancannabiscenter.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 flex-shrink-0 text-green-500" />
                <span className="text-gray-400">
                  Calle Principal #123,
                  <br />
                  Bogotá, Colombia
                </span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#inicio" className="text-gray-400 hover:text-white">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-gray-400 hover:text-white">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Síguenos</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gray-800 p-2 transition-colors hover:bg-green-600"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gray-800 p-2 transition-colors hover:bg-green-600"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-gray-800 p-2 transition-colors hover:bg-green-600"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} Colombian Cannabis Center. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
