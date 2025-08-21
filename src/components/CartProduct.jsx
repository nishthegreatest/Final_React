import React, { useEffect, useState } from "react";
import api from "../api";

const CartProduct = ({ productId, qty }) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${productId}`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch product");
      }
    };
    fetchProduct();
  }, [productId]);

  if (error)
    return (
      <td colSpan={6} className="text-center text-red-500 py-4">
        {error}
      </td>
    );
  if (!product.title)
    return (
      <td colSpan={6} className="text-center text-gray-500 py-4">
        Loading...
      </td>
    );

  return (
    <>
      <td className="px-3 sm:px-4 py-3 font-medium text-gray-800 text-sm sm:text-base">
        <div className="max-w-xs truncate">{product.title}</div>
      </td>
      <td className="px-3 sm:px-4 py-3 text-center text-sm sm:text-base">{qty}</td>
      <td className="px-3 sm:px-4 py-3 text-gray-700 text-sm sm:text-base">${product.price}</td>
      <td className="px-3 sm:px-4 py-3 font-semibold text-indigo-600 text-sm sm:text-base">
        ${(product.price * qty).toFixed(2)}
      </td>
      <td className="px-3 sm:px-4 py-3 hidden sm:table-cell">
        <img
          src={product.image}
          alt={product.title}
          className="h-12 w-12 sm:h-14 sm:w-14 object-contain rounded-md border p-1 bg-white mx-auto"
        />
      </td>
      <td className="px-3 sm:px-4 py-3">
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
        <button className="bg-sky-500 text-white px-2 sm:px-3 py-1 rounded-md shadow hover:bg-sky-600 transition-colors text-xs sm:text-sm">
          Order
        </button>
        <button className="bg-red-600 text-white px-2 sm:px-3 py-1 rounded-md shadow hover:bg-red-700 transition-colors text-xs sm:text-sm">
          Delete
        </button>
        </div>
      </td>
    </>
  );
};

export default CartProduct;
