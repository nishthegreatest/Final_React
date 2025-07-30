import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/products/category/${categoryName}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching category products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryProducts();
  }, [categoryName]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Category: {categoryName}</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryProducts;
