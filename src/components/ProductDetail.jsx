import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const ProductDetail = () => {
  const { id } = useParams();
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

  return (
    <div className="w-[75%] h-full p-4 m-auto flex gap-20">
      {detail.image ? (
        <>
          <img src={detail.image} alt={detail.title} className="w-64 h-auto" />
          <div>
            <h1 className="text-2xl font-bold mt-4">{detail.title}</h1>
            <p className="mt-2 text-gray-800">{detail.description}</p>
            <p className="mt-2 font-semibold text-lg">{detail.price} $</p>
            <div>
              <p>⭐⭐⭐⭐⭐ {detail.rating.rate}</p>
              <p>{detail.rating.count} views</p>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;
