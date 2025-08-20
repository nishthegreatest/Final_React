import React, { useEffect, useState } from "react";
import api from "../api";
import CartProduct from "../components/CartProduct";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const response = await api.get("/carts");
      const cartData = response.data;

      if (cartData.length > 0) {
        setCart(cartData[0].products);
      }
    };

    fetchCart();
  }, []);

  return (
    <div className="w-[90%] lg:w-[75%] mx-auto m-12 mb-20">
      {/* Page Title */}
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        🛍️ Your Shopping Cart
      </h2>

      {/* Table Container */}
      <div className="overflow-x-auto bg-white shadow-xl rounded-2xl border border-gray-200">
        <table className="w-full border-collapse">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Title</th>
              <th className="px-6 py-4 text-center font-semibold">Quantity</th>
              <th className="px-6 py-4 text-center font-semibold">Price</th>
              <th className="px-6 py-4 text-center font-semibold">Total</th>
              <th className="px-6 py-4 text-center font-semibold">Image</th>
              <th className="px-6 py-4 text-center font-semibold">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {cart.length > 0 ? (
              cart.map((c) => (
                <tr
                  key={c.productId}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <CartProduct productId={c.productId} qty={c.quantity} />
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-10 text-gray-500 text-lg"
                >
                  🛒 Your cart is empty
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default CartPage;
