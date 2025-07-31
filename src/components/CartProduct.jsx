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

  if (error) return <td colSpan={4}>{error}</td>;
  if (!product.title) return <td colSpan={4}>Loading...</td>;

  return (
    <>
      <td>{product.title}</td>
      <td>{qty}</td>
      <td>${product.price}</td>
      <td>${product.price * qty}</td>
      <td>
        <img
          src={product.image}
          alt={product.title}
          height="50px"
          className="h-12"
        />
      </td>
      <td>
        <button className="bg-sky-500 px-2 py-1 border rounded-xs ">
          Order
        </button>
        <button className="bg-red-600 mx-4 px-2 py-1 border rounded-xs ">
          Delete
        </button>
      </td>
    </>
  );
};

export default CartProduct;
