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
          <nav aria-label="Top" className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                {/* Logo */}
                <div className="flex-shrink-0">
                  <a
                    href="/"
                    className="transform transition-transform duration-300 hover:scale-110"
                  >
                    <img
                      alt="Logo"
                      src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                      className="h-7 w-auto sm:h-8"
                    />
                  </a>
                </div>

                {/* Categories: show from lg screens */}
                <div className="hidden lg:flex lg:ml-8 lg:space-x-6 xl:space-x-8 lg:self-stretch items-center">
                  <a
                    href="/"
                    className="relative text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-300 group"
                  >
                    Home
                    <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-indigo-600 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                  </a>

                  {categories.map((cat, idx) => (
                    <a
                      key={idx}
                      href={`/category/${cat}`}
                      className="relative text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-300 group"
                    >
                      {cat}
                      <span className="absolute left-0 -bottom-1 h-0.5 w-full bg-indigo-600 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                    </a>
                  ))}
                </div>

                {/* Desktop and tablet right side */}
                <div className="ml-auto hidden md:flex items-center space-x-3 lg:space-x-4 xl:space-x-6">
                  <button className="text-sm font-medium text-gray-700 hover:text-gray-800 transition-colors duration-300 hidden lg:block">
                    Logout
                  </button>

                  <a
                    href="#"
                    className="flex items-center text-gray-700 hover:text-gray-800 transition-colors duration-300 hidden lg:flex"
                  >
                    <img
                      alt="Canada Flag"
                      src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
                      className="h-5 w-auto"
                    />
                    <span className="sr-only">Change currency</span>
                  </a>

                  <a
                    href="#"
                    className="p-2 text-gray-400 hover:text-gray-500 transition-colors duration-300"
                  >
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6" />
                  </a>

                  <a href="/cart" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-gray-500 transition-colors duration-300"
                    />
                    <span className="ml-1 lg:ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                      0
                    </span>
                  </a>
                </div>

                {/* Mobile hamburger - show on small and medium screens */}
                <div className="ml-auto flex md:hidden">
                  <button
                    onClick={() => setMobileMenuOpen(true)}
                    aria-label="Open menu"
                    className="p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <Bars3Icon className="h-6 w-6" />
                  </button>
                </div>

                {/* Tablet hamburger - show only on md screens when categories are hidden */}
                <div className="ml-4 flex md:flex lg:hidden">
                  <button
                    onClick={() => setMobileMenuOpen(true)}
                    aria-label="Open menu"
                    className="p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <Bars3Icon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <>
              {/* Overlay */}
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setMobileMenuOpen(false)}
                aria-hidden="true"
              />

              {/* Panel */}
              <div className="fixed inset-0 z-50 flex flex-col bg-white p-4 sm:p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <a href="/" className="flex-shrink-0">
                    <img
                      alt="Logo"
                      src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                      className="h-7 w-auto sm:h-8"
                    />
                  </a>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                    className="p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <nav className="space-y-4 sm:space-y-6 flex-grow">
                  <a
                    href="/"
                    className="block text-base sm:text-lg font-medium text-gray-700 hover:text-indigo-600 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </a>
                  {categories.map((cat, idx) => (
                    <a
                      key={idx}
                      href={`/category/${cat}`}
                      className="block text-base sm:text-lg font-medium text-gray-700 hover:text-indigo-600 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {cat}
                    </a>
                  ))}
                </nav>

                <div className="mt-auto space-y-4 sm:space-y-6 mb-8 sm:mb-12">
                  <button
                    className="w-full text-left text-base sm:text-lg font-medium text-gray-700 hover:text-indigo-600 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Logout
                  </button>

                  <a
                    href="#"
                    className="flex items-center space-x-3 text-base sm:text-lg text-gray-700 hover:text-indigo-600 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <img
                      alt="Canada Flag"
                      src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
                      className="h-5 w-auto"
                    />
                    <span>Change currency</span>
                  </a>

                  <a
                    href="#"
                    className="flex items-center space-x-3 text-base sm:text-lg text-gray-700 hover:text-indigo-600 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <MagnifyingGlassIcon className="h-6 w-6" />
                    <span>Search</span>
                  </a>

                  <a
                    href="/cart"
                    className="flex items-center space-x-3 text-base sm:text-lg text-gray-700 hover:text-indigo-600 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ShoppingBagIcon className="h-6 w-6" />
                    <span>Cart (0)</span>
                  </a>
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
