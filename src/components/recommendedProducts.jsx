import { StarIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecommendedProducts = () => {
  const user_info = JSON.parse(localStorage.getItem("user"));
  const user_id = user_info.data._id;
  const user_token = user_info.token;
  const config = {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  };

  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/product/recommmendation/${user_id}`)
      .then((response) => {
        const recommendedProductIds =
          response.data.recommendationResponse.recommended_products;
        console.log("recommendedProductIds", recommendedProductIds);

        // Fetch detailed information for each recommended product
        const fetchProductDetails = recommendedProductIds.map((productId) => {
          return axios.get(
            `http://localhost:8000/api/v1/product/one/${productId}`
          );
        });

        // Wait for all the requests to resolve
        axios
          .all(fetchProductDetails)
          .then((productResponses) => {
            const recommendedProducts = productResponses.map(
              (response) => response.data
            );
            console.log("recommendedProducts", recommendedProducts);

            // Update the state with the recommended products
            setRecommendedProducts(recommendedProducts);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, [user_id]);

  const navigateToProduct = (_id) => {
    navigate(`/singleproduct/${_id}`);
  };

  const addToWishlist = (_id) => {
    console.log("Wishlist button clicked for product: ", _id);
    const data = {
      userId: user_id,
      productId: _id,
    };

    axios
      .post("http://localhost:8000/api/v1/wishlist", data)
      .then((response) => {
        // Handle successful wishlist addition
        console.log("Added to wishlist---------:", response.data);
        alert("Item added to wishlist");
      })
      .catch((error) => {
        // Handle error
        console.error("Error adding to wishlist:", error);
      });
  };
  const addToCart = (_id) => {
    const data = {
      userId: user_id,
      productId: _id,
    };

    axios
      .post("http://localhost:8000/api/v1/cart/create", data, config)
      .then((response) => {
        // Handle successful addition to cart
        alert("Product added to cart, successfully");
        console.log("Product added to cart:", response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error adding to cart:", error);
      });
  };

  const productsLimit = 4;

  return (
    <div>
      <div className="lg:px-18 p-3 bg-gray-100">
        <div className=" ml-2 max-w-2xl px-4 lg:max-w-7xl lg:px-4">
          <h1 className="mt-5 text-center text-3xl font-medium mb-2"> Recommended Products:</h1>
          <div className="mt-6 grid grid-cols-1 gap-x-11 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-9 ">
            {recommendedProducts.slice(0, productsLimit).map((product) => (
              <div
                key={product._id}
                className={`bg-pik-200  group relative rounded-md lg:h-30 border-2 border-black-200 bg-white p-4 `}
                onMouseEnter={() => setHoveredProduct(product)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                <div className=" border-2 border-gray-300 min-h-80 aspect-h-1 aspect-w-1 w-full relative overflow-hidden rounded-lg  bg-white lg:aspect-none group-hover:opacity-90 lg:h-60">
                  <a
                    href={`/singleproduct/${product._id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToProduct(product.data._id);
                    }}
                  >
                    <img
                      src={product.data.productImages[0]}
                      alt={product.data.imageAlt}
                      className={`h-full w-full object-cover object-center lg:h-60 lg:w-full transition-transform ${
                        hoveredProduct === product ? "scale-95 " : ""
                      }`}
                    />{" "}
                  </a>

                  <div className="add-to-wishlist">
                    {" "}
                    <button
                      className="absolute top-0 right-0 m-1 bg-white rounded-full shadow-md p-2 "
                      onClick={(e) => {
                        e.preventDefault();
                        addToWishlist(product._id);
                      }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 fill-current text-pink-500 hover:text-purple-700 hover:border-none"
                      >
                        <path d="M12 21.35l-1.14-.98C5.54 15.29 2 12.16 2 8.5 2 5.42 4.42 3 7.5 3c1.79 0 3.44.78 4.5 2.03C13.06 3.78 14.71 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.66-3.54 6.79-8.86 12.87L12 21.35z" />{" "}
                      </svg>
                    </button>{" "}
                  </div>
                  {product === hoveredProduct && (
                    <button
                      className="absolute bottom-0 left-0 w-full py-2 bg-blue-600 text-white font-medium rounded-b-md hover:bg-customColor"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent the default behavior
                        addToCart(product._id);
                      }}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-1xl font-medium text-gray-700">
                      <a href={product.data.href}>
                        <span aria-hidden="true" className="absolute " />
                        {product.data.productName}
                      </a>
                    </h3>
                    <p className="mt-2">
                      <span className="text-red-500 font-bold">
                        Rs.{product.data.salePrice}
                      </span>
                      <span className="ml-2 line-through text-gray-500">
                        Rs.{product.data.originalPrice}
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-900 text-right">
                      <StarIcon className="inline-block w-4 h-4 mr-1 text-yellow-500 fill-current" />
                      ({product.data.ratingsAverage}/5){" "}
                    </p>
                    <p className="text-sm font-medium text-gray-900 pt-1">
                      {product.data.soldItems
                        ? `(${product.data.soldItems}) Sold`
                        : "(0) Sold"}
                    </p>
                  </div>
                </div>{" "}
              </div>
            ))}
            <hr className="my-1 mx- border-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedProducts;
