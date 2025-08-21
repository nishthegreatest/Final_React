import React, { useEffect, useState } from "react";
import api from "../api";
import CartProduct from "../components/CartProduct";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        // Use a specific user's cart
        const response = await api.get("/carts/user/1");
        const cartData = response.data;

        if (Array.isArray(cartData) && cartData.length > 0) {
          setCart(cartData[0].products || []);
        } else {
          setCart([]);
        }
      } catch (error) {
        console.error("Failed to fetch cart:", error);
        setCart([]);
      }
    };

    fetchCart();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:py-8 lg:py-12 sm:px-6 lg:px-8 mb-20">
      {/* Page Title */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 text-center">
        🛍️ Your Shopping Cart
      </h2>

      {/* Table Container */}
      <div className="overflow-x-auto bg-white shadow-xl rounded-lg sm:rounded-2xl border border-gray-200">
        <table className="w-full border-collapse">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <tr>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-sm sm:text-base">Title</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center font-semibold text-sm sm:text-base">Qty</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center font-semibold text-sm sm:text-base">Price</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center font-semibold text-sm sm:text-base">Total</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center font-semibold text-sm sm:text-base hidden sm:table-cell">Image</th>
              <th className="px-3 sm:px-6 py-3 sm:py-4 text-center font-semibold text-sm sm:text-base">Action</th>
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
                  className="text-center py-8 sm:py-10 text-gray-500 text-base sm:text-lg px-4"
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
