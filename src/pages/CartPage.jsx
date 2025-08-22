import React from "react";
import { useCart } from "../contexts/CartContext";
import Swal from 'sweetalert2';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, parseInt(newQuantity));
  };

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleOrder = (item) => {
    Swal.fire({
      title: 'Order Placed!',
      html: `
        <div class="text-left">
          <p><strong>Item:</strong> ${item.title}</p>
          <p><strong>Quantity:</strong> ${item.quantity}</p>
          <p><strong>Total:</strong> $${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      `,
      icon: 'success',
      confirmButtonText: 'Continue Shopping',
      confirmButtonColor: '#10b981',
      timer: 3000,
      timerProgressBar: true
    });
  };

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
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-3 sm:px-4 py-3 font-medium text-gray-800 text-sm sm:text-base">
                    <div className="max-w-xs truncate">{item.title}</div>
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-center text-sm sm:text-base">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </td>
                  <td className="px-3 sm:px-4 py-3 text-gray-700 text-sm sm:text-base">${item.price}</td>
                  <td className="px-3 sm:px-4 py-3 font-semibold text-indigo-600 text-sm sm:text-base">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="px-3 sm:px-4 py-3 hidden sm:table-cell">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-12 w-12 sm:h-14 sm:w-14 object-contain rounded-md border p-1 bg-white mx-auto"
                    />
                  </td>
                  <td className="px-3 sm:px-4 py-3">
                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                      <button 
                        onClick={() => handleOrder(item)}
                        className="bg-sky-500 text-white px-2 sm:px-3 py-1 rounded-md shadow hover:bg-sky-600 transition-colors text-xs sm:text-sm"
                      >
                        Order
                      </button>
                      <button 
                        onClick={() => handleRemove(item.id)}
                        className="bg-red-600 text-white px-2 sm:px-3 py-1 rounded-md shadow hover:bg-red-700 transition-colors text-xs sm:text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
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

      {/* Cart Summary */}
      {cartItems.length > 0 && (
        <div className="mt-6 bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex justify-between items-center text-lg sm:text-xl font-bold">
            <span>Total: ${getTotalPrice().toFixed(2)}</span>
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;