import React, { useState, useEffect, useRef } from "react";
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  Bars3Icon,
  XMarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const categories = ["Men", "Women", "Kids", "Electronics", "Accessories"];

const AppBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
        setSearchOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Spacer to prevent content jump */}
      <div className="h-14 sm:h-16 lg:h-18" />

      <div
        className={`bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showNav ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <header className="relative">
          <nav className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 xl:px-8">
            <div className="flex h-14 sm:h-16 lg:h-18 items-center justify-between">
              
              {/* Left Section - Logo */}
              <div className="flex items-center flex-shrink-0">
                <a
                  href="/"
                  className="flex items-center space-x-2 group"
                >
                  <div className="relative">
                    <img
                      alt="MyShop Logo"
                      src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                      className="h-6 w-auto sm:h-7 lg:h-8 transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <span className="hidden sm:block text-lg lg:text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                    MyShop
                  </span>
                </a>
              </div>

              {/* Center Section - Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
                <a
                  href="/"
                  className="relative px-3 py-2 text-sm xl:text-base font-medium text-gray-700 hover:text-indigo-600 transition-all duration-300 group rounded-lg hover:bg-gray-50"
                >
                  Home
                  <span className="absolute left-1/2 bottom-0 h-0.5 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-4/5 group-hover:left-[10%]" />
                </a>
                {categories.map((category) => (
                  <a
                    key={category}
                    href={`/category/${category.toLowerCase()}`}
                    className="relative px-3 py-2 text-sm xl:text-base font-medium text-gray-700 hover:text-indigo-600 transition-all duration-300 group rounded-lg hover:bg-gray-50"
                  >
                    {category}
                    <span className="absolute left-1/2 bottom-0 h-0.5 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-4/5 group-hover:left-[10%]" />
                  </a>
                ))}
              </div>

              {/* Right Section - Actions */}
              <div className="flex items-center space-x-1 sm:space-x-2">
                
                {/* Search - Desktop & Tablet */}
                <div className="hidden sm:block lg:hidden">
                  <button
                    onClick={() => setSearchOpen(!searchOpen)}
                    className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-all duration-300"
                    aria-label="Search"
                  >
                    <MagnifyingGlassIcon className="h-5 w-5" />
                  </button>
                </div>

                {/* Search - Desktop Full */}
                <div className="hidden lg:flex items-center">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-48 xl:w-64 pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                    />
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* User Account - Desktop */}
                <div className="hidden lg:flex items-center space-x-2">
                  <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-all duration-300">
                    <UserIcon className="h-5 w-5" />
                  </button>
                  <div className="h-5 w-px bg-gray-300" />
                  <button className="text-sm font-medium text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300">
                    Sign In
                  </button>
                </div>

                {/* Currency - Desktop */}
                <div className="hidden lg:block">
                  <button className="flex items-center space-x-1 p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-all duration-300">
                    <img
                      alt="Currency"
                      src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
                      className="h-4 w-4"
                    />
                    <span className="text-sm font-medium">CAD</span>
                  </button>
                </div>

                {/* Cart - Always visible */}
                <a
                  href="/cart"
                  className="relative flex items-center p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-all duration-300 group"
                >
                  <ShoppingBagIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    0
                  </span>
                  <span className="hidden sm:block ml-2 text-sm font-medium">Cart</span>
                </a>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="lg:hidden p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-all duration-300"
                  aria-label="Open menu"
                >
                  <Bars3Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
            </div>

            {/* Mobile/Tablet Search Bar */}
            {searchOpen && (
              <div className="sm:block lg:hidden border-t border-gray-100 px-4 py-3 bg-gray-50">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    autoFocus
                  />
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
            )}
          </nav>

          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Slide-out Panel */}
              <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl lg:hidden transform transition-transform duration-300">
                <div className="flex flex-col h-full">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center space-x-2">
                      <img
                        alt="MyShop Logo"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="h-6 w-auto"
                      />
                      <span className="text-lg font-bold text-gray-900">MyShop</span>
                    </div>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-white rounded-lg transition-all duration-300"
                      aria-label="Close menu"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Search - Mobile Only */}
                  <div className="p-4 border-b border-gray-100 sm:hidden">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex-1 overflow-y-auto py-4">
                    <nav className="px-4 space-y-1">
                      <a
                        href="/"
                        className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        🏠 Home
                      </a>
                      
                      <div className="pt-2">
                        <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                          Categories
                        </p>
                        {categories.map((category) => (
                          <a
                            key={category}
                            href={`/category/${category.toLowerCase()}`}
                            className="flex items-center px-4 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-300"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {category}
                          </a>
                        ))}
                      </div>
                    </nav>
                  </div>

                  {/* Footer Actions */}
                  <div className="border-t border-gray-200 p-4 space-y-2 bg-gray-50">
                    <button className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-white rounded-lg transition-all duration-300">
                      <UserIcon className="h-5 w-5 mr-3" />
                      Sign In
                    </button>
                    
                    <button className="flex items-center w-full px-4 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-white rounded-lg transition-all duration-300">
                      <img
                        alt="Currency"
                        src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
                        className="h-4 w-4 mr-3"
                      />
                      Change Currency (CAD)
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