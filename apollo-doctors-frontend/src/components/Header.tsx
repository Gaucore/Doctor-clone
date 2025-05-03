'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md relative">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-bold text-apolloBlue">Apollo247 Clone</div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/"
              className={`font-medium ${pathname === '/' ? 'text-apolloLightBlue' : 'text-gray-600 hover:text-apolloLightBlue'}`}
            >
              Home
            </Link>
            <Link
              href="/add-doctor"
              className={`font-medium ${pathname === '/add-doctor' ? 'text-apolloLightBlue' : 'text-gray-600 hover:text-apolloLightBlue'}`}
            >
              Add Doctor
            </Link>
            <Link
              href="/filter"
              className={`font-medium ${pathname === '/filter' ? 'text-apolloLightBlue' : 'text-gray-600 hover:text-apolloLightBlue'}`}
            >
              Filter
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-apolloLightBlue focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md z-50">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className={`font-medium block py-2 ${pathname === '/' ? 'text-apolloLightBlue' : 'text-gray-600 hover:text-apolloLightBlue'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/add-doctor"
                className={`font-medium block py-2 ${pathname === '/add-doctor' ? 'text-apolloLightBlue' : 'text-gray-600 hover:text-apolloLightBlue'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Add Doctor
              </Link>
              <Link
                href="/filter"
                className={`font-medium block py-2 ${pathname === '/filter' ? 'text-apolloLightBlue' : 'text-gray-600 hover:text-apolloLightBlue'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Filter
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
