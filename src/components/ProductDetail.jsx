import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setDetail(response.data);
      } catch (err) {
        console.error("Failed to fetch product detail:", err);
      }
    };

    fetchDetail();
  }, [id]);

  const handleOrder = () => {
    alert(`Ordering product: ${detail.title}`);
    // Or navigate somewhere, e.g., navigate("/order-confirmation");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:py-8 lg:py-12 sm:px-6 lg:px-8">
      {detail.image ? (
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 bg-white shadow-lg rounded-xl p-4 sm:p-6 lg:p-8">
          {/* Product Image */}
          <div className="flex justify-center items-center bg-gray-100 rounded-lg p-4 sm:p-6 lg:flex-shrink-0">
            <img
              src={detail.image}
              alt={detail.title}
              className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              {detail.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              {detail.description}
            </p>

            <p className="text-xl sm:text-2xl font-semibold text-indigo-600 mb-2">
              ${detail.price}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-4 sm:mb-6">
              <p className="flex items-center">
                ⭐⭐⭐⭐⭐ <span className="ml-2">{detail.rating?.rate}</span>
              </p>
              <p>{detail.rating?.count} reviews</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => navigate("/")}
                className="px-5 py-2 rounded-md bg-gray-500 text-white shadow hover:bg-gray-600 transition-colors text-center"
              >
                Cancel
              </button>

              <button
                onClick={handleOrder}
                className="px-5 py-2 rounded-md bg-green-600 text-white shadow hover:bg-green-700 transition-colors text-center"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;
