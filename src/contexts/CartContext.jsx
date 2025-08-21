import { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    try {
      const response = await api.get("/carts");
      const cartData = response.data;
      
      if (Array.isArray(cartData) && cartData.length > 0 && cartData[0] && Array.isArray(cartData[0].products)) {
        setCartCount(cartData[0].products.length);
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