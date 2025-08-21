import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import api from "../api";

const ProductList = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const endpoint = categoryName
          ? `/products/category/${categoryName}`
          : "/products";
        const response = await api.get(endpoint);
        setProducts(Array.isArray(response.data) ? response.data : []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]);
        setError("Failed to fetch products");
      }
    };
    fetchProducts();
  }, [categoryName]);

  if (error)
    return (
      <div className="p-6 text-center text-red-600 font-semibold bg-red-50 rounded-md">
        {error}
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-8">
          {categoryName ? `Products in "${categoryName}"` : "All Products"}
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.isArray(products) && products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow p-4 flex flex-col"
            >
              {/* Image */}
              <NavLink to={`/detail/${product.id}`} className="block relative">
                <img
                  alt={product.title}
                  src={product.image}
                  className="h-60 w-full object-contain rounded-md bg-gray-100 p-4 group-hover:scale-105 transition-transform duration-300"
                />
              </NavLink>

              {/* Title + Price */}
              <div className="mt-4 flex justify-between items-start flex-1">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-sm font-semibold text-indigo-600 ml-2">
                  ${product.price}
                </p>
              </div>

              {/* CTA */}
              <NavLink
                to={`/detail/${product.id}`}
                className="mt-4 inline-block text-center bg-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-md shadow hover:bg-indigo-700 transition-colors"
              >
                View Detail
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
