import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 sm:px-10 lg:px-20">
      <h1 className="text-4xl font-bold  text-center text-indigo-700 mb-12">
        🛒 Featured Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-3xl p-5 shadow-md hover:shadow-lg hover:scale-[1.02] transition duration-300 flex flex-col justify-between"
          >
            <div className="flex justify-center items-center h-48 mb-4">
              <img
                src={product.image}
                alt={product.title}
                className="h-full object-contain"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
              {product.title}
            </h2>
            <p className="text-sm text-gray-500 line-clamp-2 mb-3">
              {product.description}
            </p>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-indigo-600 font-bold text-lg">
                ${product.price}
              </span>
              <button
                onClick={() => setSelectedProduct(product)}
                className="bg-indigo-600 text-white px-4 py-1.5 rounded-xl hover:bg-indigo-700 text-sm"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl shadow-xl p-6 max-w-3xl w-full relative animate-fade-in">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl"
            >
              &times;
            </button>

            {/* Modal Content */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 bg-gray-100 p-6 rounded-2xl w-full md:w-1/2 flex justify-center">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="h-60 object-contain"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedProduct.title}
                </h2>
                <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                <div className="text-xl font-bold text-indigo-600 mb-4">
                  ${selectedProduct.price}
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl transition">
                  🛍 Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
