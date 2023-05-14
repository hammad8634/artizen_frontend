import { StarIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../layouts/navbar";
import Productpage from "./productsPage";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);


  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/product/all")
      .then((response) => {
        setProducts(response.data.product);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleLikeClick = (product) => {
    console.log("Like button clicked for product: ", product);
  };

  const addToCart = (product) => {
    console.log("Product Added to Cart: ", product);
  };
  return (
    <Navbar>
      <div className="lg:px-24 bg-gray-100">
        <div className="mt-6 grid grid-cols-1 gap-x-11 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-9">
          {products.map((product) => (
            <div
              key={product._id}
              className={`group relative rounded-md lg:h-30 border-2 border-black-200 bg-white p-2 bg-gray-100`}
              onMouseEnter={() => setHoveredProduct(product)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="min-h-80 aspect-h-1 aspect-w-1 w-full relative overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-90 lg:h-60">
                <img
                  src={product.photos}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-60 lg:w-full"
                />
                <button
                  className="absolute top-0 right-0 m-1 bg-white rounded-full shadow-md p-2"
                  onClick={() => handleLikeClick(product._id)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 fill-current text-pink-500"
                  >
                    <path d="M12 21.35l-1.14-.98C5.54 15.29 2 12.16 2 8.5 2 5.42 4.42 3 7.5 3c1.79 0 3.44.78 4.5 2.03C13.06 3.78 14.71 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.66-3.54 6.79-8.86 12.87L12 21.35z" />{" "}
                  </svg>
                </button>{" "}
                {product === hoveredProduct && (
                  <button
                    className="absolute bottom-0 left-0 w-full py-2 bg-blue-600 text-white font-medium rounded-b-md hover:bg-purple-700"
                    onClick={() => addToCart(product._id)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute " />
                      {product.productName}
                    </a>
                  </h3>
                  <p className="mt-2 font-bold text-red-500">
                    Rs.{product.originalPrice}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 text-right">
                    <StarIcon className="inline-block w-4 h-4 mr-2 text-yellow-500 fill-current" />
                    ({product.ratingsAverage}/5){" "}
                  </p>
                  <p className="text-sm font-medium text-gray-900 pt-1 ">
                    ({product.soldItems}) Sold
                  </p>
                </div>
              </div>
            </div>
          ))}
          <hr className="my-10 border-gray-300" />
        </div>
        <Productpage />
      </div>
    </Navbar>
  );
};

export default HomePage;
