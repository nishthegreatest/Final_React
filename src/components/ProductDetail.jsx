import axios from "axios";
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
    <div className="w-[75%] h-full p-4 m-auto flex gap-20 flex-col">
      {detail.image ? (
        <div className="flex gap-20">
          <img src={detail.image} alt={detail.title} className="w-64 h-auto" />
          <div>
            <h1 className="text-2xl font-bold mt-4">{detail.title}</h1>
            <p className="mt-2 text-gray-800">{detail.description}</p>
            <p className="mt-2 font-semibold text-lg">{detail.price} $</p>
            <div>
              <p>⭐⭐⭐⭐⭐ {detail.rating.rate}</p>
              <p>{detail.rating.count} views</p>
            </div>

            <div className="flex gap-4 mt-5">
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleOrder}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Order
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;
