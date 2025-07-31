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
    <div className="w-[75%] m-auto">
      <h2>Cart Items</h2>
      <table border="1" cellPadding="10" className="w-full">
        <thead>
          <tr>
            <td>Title</td>
            <td>Quantity</td>
            <td>Price</td>
            <td>Total</td>
            <td>Image</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {cart.map((c) => (
            <tr key={c.productId}>
              <CartProduct productId={c.productId} qty={c.quantity} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartPage;
