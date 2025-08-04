import React, { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const categories = ["Men", "Women", "Kids", "Electronics", "Accessories"];

const AppBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Spacer */}
      <div className="h-16" />

      <div className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <header>
          <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              
              {/* Logo */}
              <div className="flex items-center">
                <a href="/" className="flex items-center space-x-2">
                  <img
                    alt="MyShop"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  />
                  <span className="text-xl font-bold text-gray-900">MyShop</span>
                </a>
              </div>

              {/* Desktop Navigation - Categories */}
              <div className="hidden lg:flex items-center space-x-8">
                <a
                  href="/"
                  className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                >
                  Home
                </a>
                {categories.map((category) => (
                  <a
                    key={category}
                    href={`/category/${category.toLowerCase()}`}
                    className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
                  >
                    {category}
                  </a>
                ))}
              </div>

              {/* Right Section */}
              <div className="flex items-center space-x-4">
                
                {/* Desktop Search */}
                <div className="hidden lg:block">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Cart */}
                <a
                  href="/cart"
                  className="relative flex items-center p-2 text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <ShoppingBagIcon className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">
                    0
                  </span>
                </a>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2 text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <Bars3Icon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Menu Panel */}
              <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl lg:hidden">
                <div className="flex flex-col h-full">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <span className="text-lg font-bold text-gray-900">Menu</span>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 text-gray-500 hover:text-gray-700"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Search - Mobile */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="flex-1 overflow-y-auto py-4">
                    <nav className="px-4 space-y-2">
                      <a
                        href="/"
                        className="block px-4 py-3 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Home
                      </a>
                      
                      {categories.map((category) => (
                        <a
                          key={category}
                          href={`/category/${category.toLowerCase()}`}
                          className="block px-4 py-3 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {category}
                        </a>
                      ))}
                    </nav>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-gray-200 p-4">
                    <button className="w-full px-4 py-3 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-lg font-medium transition-colors text-left">
                      Sign In
                    </button>
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