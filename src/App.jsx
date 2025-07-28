import React from "react";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Appbar from "./components/Appbar";
import FootPage from "./components/FootPage";

const App = () => {
  return (
    <div>
      <Appbar />
      <ProductList />
      <ProductDetail />
      <FootPage />
    </div>
  );
};

export default App;
