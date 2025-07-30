import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import api from "../api";

const ProductList = () => {
  const { categoryName } = useParams(); // Use categoryName param here
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const endpoint = categoryName
          ? `/products/category/${categoryName}`
          : "/products";
        const response = await api.get(endpoint);
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products");
      }
    };
    fetchProducts();
  }, [categoryName]);

  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          {categoryName ? `Filtered by: ${categoryName}` : "All Products"}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative  rounded-md p-4 hover:shadow-lg"
            >
              <NavLink to={`/detail/${product.id}`}>
                <img
                  alt={product.title}
                  src={product.image}
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                />
              </NavLink>

              <div className="mt-4 flex justify-between items-start">
                <h3 className="text-sm text-gray-700">{product.title}</h3>
                <p className="text-sm font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>

              <NavLink
                to={`/detail/${product.id}`}
                className="text-blue-500 text-sm hover:underline mt-1 inline-block"
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
