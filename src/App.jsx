import React from "react";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Appbar from "./components/Appbar";
import FootPage from "./components/FootPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CartPage from "./pages/CartPage";
import AuthProvider from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Appbar />
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
              path="/detail"
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
          <FootPage />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;
