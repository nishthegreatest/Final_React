import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from "@headlessui/react";
import api from "../api";

const Appbar = () => {
  const { logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const response = await api.get("/products/categories");
        setCategory(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Failed to fetch categories", error);
        setCategory([]);
      }
    };
    getAllCategory();
  }, []);

  const onLogout = () => {
    logout();
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };
  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <header className="relative bg-white">
        {/* Mobile menu */}
        <Popover className="lg:hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <div className="flex items-center">
              <NavLink to="/" onClick={handleMobileMenuClose}>
                <img
                  alt="Logo"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </NavLink>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Mobile Cart */}
              <NavLink
                to="/cart"
                onClick={handleMobileMenuClose}
                className="relative p-2 text-gray-400 hover:text-indigo-500"
              >
                <ShoppingBagIcon className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </NavLink>
              
              {/* Mobile menu button */}
              <PopoverButton 
                className="p-2 text-gray-400 hover:text-indigo-500"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </PopoverButton>
            </div>
          </div>

          <PopoverPanel className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200 z-50">
            <div className="px-4 py-6 space-y-4">
              <NavLink
                to="/"
                onClick={handleMobileMenuClose}
                className={({ isActive }) =>
                  `block px-3 py-2 text-base font-medium rounded-md ${
                    isActive
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                  }`
                }
              >
                Home
              </NavLink>
              
              {Array.isArray(category) && category.map((cat, index) => (
                <NavLink
                  key={index}
                  to={`/category/${encodeURIComponent(cat)}`}
                  onClick={handleMobileMenuClose}
                  className={({ isActive }) =>
                    `block px-3 py-2 text-base font-medium rounded-md capitalize ${
                      isActive
                        ? "text-indigo-600 bg-indigo-50"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                    }`
                  }
                >
                  {cat}
                </NavLink>
              ))}
              
              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={onLogout}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
                >
                  Logout
                </button>
              </div>
            </div>
          </PopoverPanel>
        </Popover>

        {/* Desktop menu */}
        <nav
          aria-label="Top"
          className="hidden lg:block mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <NavLink to="/">
                  <img
                    alt="Logo"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-9 w-auto hover:scale-110 transition-transform duration-200"
                  />
                </NavLink>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-10 lg:block lg:self-stretch">
                <div className="flex h-full space-x-10 items-center">
                  {/* Home link */}
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "text-indigo-600 text-sm font-semibold border-b-2 border-indigo-600 pb-1"
                        : "text-gray-700 text-sm font-medium hover:text-indigo-500 transition-colors"
                    }
                  >
                    Home
                  </NavLink>

                  {/* Category links */}
                  {Array.isArray(category) && category.map((cat, index) => (
                    <Popover key={index} className="flex">
                      <PopoverButton className="group relative flex items-center justify-center text-sm font-medium text-gray-700 hover:text-indigo-500 transition-colors duration-200 ease-out">
                        <NavLink
                          to={`/category/${encodeURIComponent(cat)}`}
                          className={({ isActive }) =>
                            isActive
                              ? "text-indigo-600 border-b-2 border-indigo-600 pb-1 capitalize"
                              : "hover:text-indigo-500 capitalize"
                          }
                        >
                          {cat}
                        </NavLink>
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 -bottom-px z-30 h-0.5 transition duration-200 ease-out group-data-open:bg-indigo-600"
                        />
                      </PopoverButton>
                    </Popover>
                  ))}
                </div>
              </PopoverGroup>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <button
                    onClick={onLogout}
                    className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:text-white hover:bg-indigo-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a
                    href="#"
                    className="flex items-center text-gray-700 hover:text-indigo-500 transition-colors"
                  >
                    <img
                      alt=""
                      src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg"
                      className="block h-auto w-5 shrink-0"
                    />
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <a
                    href="#"
                    className="p-2 text-gray-400 hover:text-indigo-500 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon
                      aria-hidden="true"
                      className="h-6 w-6"
                    />
                  </a>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <NavLink
                    to="/cart"
                    className="group -m-2 flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors relative"
                  >
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-500 transition-colors"
                    />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Appbar;