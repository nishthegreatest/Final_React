import React from "react";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Appbar from "./components/Appbar";
import FootPage from "./components/FootPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";
import AuthProvider from "./contexts/AuthContext";
import CartProvider from "./contexts/CartContext";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            {/* Main content area */}
            <div className="flex-grow">
              <ProtectedRoute>
                <Appbar />
              </ProtectedRoute>

              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <ProductList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/category/:categoryName"
                  element={
                    <ProtectedRoute>
                      <ProductList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/detail/:id"
                  element={
                    <ProtectedRoute>
                      <ProductDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <CartPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </div>

            {/* Footer stays at bottom */}
            <ProtectedRoute>
              <FootPage />
            </ProtectedRoute>
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
