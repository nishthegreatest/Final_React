import axios from "axios";
import { useEffect, useState } from "react";

const ProductList = () => {
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productList = await axios.get(
          "https://fakestoreapi.com/products"
        );
        if (productList.status === 200) {
          setProduct(productList.data);
          setSuccess(true);
        }
      } catch (e) {
        setError(e.message);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <h1>Web Error hz</h1>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {product.map((pro) => (
            <div key={pro.id} className="group relative">
              <img
                alt={pro.tittle}
                src={pro.image}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {pro.name}
                    </a>
                  </h3>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {pro.price} $
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
