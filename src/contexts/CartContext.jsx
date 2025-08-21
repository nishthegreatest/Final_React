import { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    try {
      // Use a specific user's cart since fakestoreapi requires user ID
      const response = await api.get("/carts/user/1");
      const cartData = response.data;
      
      if (Array.isArray(cartData) && cartData.length > 0) {
        const totalItems = cartData.reduce((total, cart) => {
          if (cart && Array.isArray(cart.products)) {
            return total + cart.products.length;
          }
          return total;
        }, 0);
        setCartCount(totalItems);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}