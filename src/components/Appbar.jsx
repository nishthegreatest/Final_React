import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { Popover, PopoverButton, PopoverGroup } from "@headlessui/react";
import api from "../api";

const Appbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const response = await api.get("/products/categories");
        setCategory(response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    getAllCategory();
  }, []);

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
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
                  {category.map((cat, index) => (
                    <Popover key={index} className="flex">
                      <PopoverButton className="group relative flex items-center justify-center text-sm font-medium text-gray-700 hover:text-indigo-500 transition-colors duration-200 ease-out">
                        <NavLink
                          to={`/category/${encodeURIComponent(cat)}`}
                          className={({ isActive }) =>
                            isActive
                              ? "text-indigo-600 border-b-2 border-indigo-600 pb-1"
                              : "hover:text-indigo-500"
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
                    className="group -m-2 flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-500 transition-colors"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                      0
                    </span>
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
