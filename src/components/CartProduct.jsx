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
      <td className="px-4 py-3 font-medium text-gray-800">{product.title}</td>
      <td className="px-4 py-3 text-center">{qty}</td>
      <td className="px-4 py-3 text-gray-700">${product.price}</td>
      <td className="px-4 py-3 font-semibold text-indigo-600">
        ${(product.price * qty).toFixed(2)}
      </td>
      <td className="px-4 py-3">
        <img
          src={product.image}
          alt={product.title}
          className="h-14 w-14 object-contain rounded-md border p-1 bg-white"
        />
      </td>
      <td className="px-4 py-3 space-x-2">
        <button className="bg-sky-500 text-white px-3 py-1 rounded-md shadow hover:bg-sky-600 transition-colors">
          Order
        </button>
        <button className="bg-red-600 text-white px-3 py-1 rounded-md shadow hover:bg-red-700 transition-colors">
          Delete
        </button>
      </td>
    </>
  );
};

export default CartProduct;
