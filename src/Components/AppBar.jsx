import React, { useState, useEffect, useRef } from "react";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const categories = ["Men", "Women", "Kids", "Accessories"];

const AppBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Spacer to prevent content jump under fixed navbar */}
      <div className="h-16" />

      <div
        className={`bg-white shadow-sm fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          showNav ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <header className="relative bg-white">
          <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center justify-between">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <a
                    href="/"
                    className="transform transition-transform duration-300 hover:scale-110"
                  >
                    <img
                      alt="Logo"
                      src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                      className="h-6 w-auto sm:h-7 lg:h-8"
                    />
                  </a>
                </div>

                {/* Desktop Categories - Hidden on mobile/tablet */}
                <div className="hidden lg:flex lg:ml-8 lg:space-x-8 lg:self-stretch items-center">
                  <a
                    href="/"
                    className="relative text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-300 group py-2"
                  >
                    Home
                    <span className="absolute left-0 bottom-0 h-0.5 w-full bg-indigo-600 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                  </a>

                  {categories.map((cat, idx) => (
                    <a
                      key={idx}
                      href={`/category/${cat}`}
                      className="relative text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-300 group py-2"
                    >
                      {cat}
                      <span className="absolute left-0 bottom-0 h-0.5 w-full bg-indigo-600 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                    </a>
                  ))}
                </div>

                {/* Right side actions */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                  {/* Desktop only items */}
                  <div className="hidden lg:flex items-center space-x-4">
                    <button className="text-sm font-medium text-gray-700 hover:text-gray-800 transition-colors duration-300">
                      Logout
                    </button>

                    <a
                      href="#"
                      className="flex items-center text-gray-700 hover:text-gray-800 transition-colors duration-300"
                    >
                      <img
                        alt="Canada Flag"
                        src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
                        className="h-5 w-auto"
                      />
                      <span className="sr-only">Change currency</span>
                    </a>
                  </div>

                  {/* Search - Hidden on mobile */}
                  <a
                    href="#"
                    className="hidden sm:block p-2 text-gray-400 hover:text-gray-500 transition-colors duration-300"
                  >
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon aria-hidden="true" className="h-5 w-5 sm:h-6 sm:w-6" />
                  </a>

                  {/* Cart - Always visible */}
                  <a href="/cart" className="group flex items-center p-2">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-gray-400 group-hover:text-gray-500 transition-colors duration-300"
                    />
                    <span className="ml-1 text-sm font-medium text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                      0
                    </span>
                  </a>

                  {/* Mobile/Tablet hamburger menu */}
                  <button
                    onClick={() => setMobileMenuOpen(true)}
                    aria-label="Open menu"
                    className="lg:hidden p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
                  >
                    <Bars3Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile/Tablet menu overlay */}
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
                aria-hidden="true"
              />

              {/* Slide-out panel */}
              <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl lg:hidden">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <a href="/" className="flex-shrink-0">
                      <img
                        alt="Logo"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="h-7 w-auto"
                      />
                    </a>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      aria-label="Close menu"
                      className="p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Navigation */}
                  <div className="flex-1 overflow-y-auto p-4">
                    <nav className="space-y-1">
                      <a
                        href="/"
                        className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Home
                      </a>
                      {categories.map((cat, idx) => (
                        <a
                          key={idx}
                          href={`/category/${cat}`}
                          className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors duration-300"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {cat}
                        </a>
                      ))}
                    </nav>

                    {/* Mobile-only search */}
                    <div className="mt-6 sm:hidden">
                      <a
                        href="#"
                        className="flex items-center px-3 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <MagnifyingGlassIcon className="h-5 w-5 mr-3" />
                        Search
                      </a>
                    </div>
                  </div>

                  {/* Footer actions */}
                  <div className="border-t border-gray-200 p-4 space-y-1">
                    <button
                      className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Logout
                    </button>

                    <a
                      href="#"
                      className="flex items-center px-3 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md transition-colors duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <img
                        alt="Canada Flag"
                        src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
                        className="h-5 w-auto mr-3"
                      />
                      Change Currency
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
        </header>
      </div>
    </>
  );
};

export default AppBar;