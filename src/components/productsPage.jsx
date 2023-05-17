import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Productpage = () => {
  const user_info = JSON.parse(localStorage.getItem("user"));
  const user_id = user_info?.data._id;
  const user_token = user_info?.token;
  const config = {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  };
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 12;
  const offset = currentPage * productsPerPage;
  const currentProducts = products.slice(offset, offset + productsPerPage);
  const pageCount = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/product/all")
      .then((response) => {
        setProducts(response.data.product);
      })
      .catch((error) => console.log(error));
  }, []);
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

  const handlePageClick = ({ selected }) => {
    if (selected >= 0 && selected < pageCount) {
      setCurrentPage(selected);
    }
  };

  return (
    <div className="lg:px-18 p-3 bg-gray-100">
      <div className=" ml-2 max-w-2xl px-4 lg:max-w-7xl lg:px-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {/* Customers also purchased */}
          <h1 className="text-3xl font-medium text-center">
            ArtiZen Store Products:
          </h1>
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-11 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-9 ">
          {currentProducts.map((product) => (
            <div
              key={product._id}
              className={` group relative rounded-md lg:h-30 border-2 border-black-200 bg-white p-4 bg-gray-100`}
              onMouseEnter={() => setHoveredProduct(product)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className=" border-2 border-gray-300 min-h-80 aspect-h-1 aspect-w-1 w-full relative overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-90 lg:h-60">
                <a
                  href={`/singleproduct/${product._id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToProduct(product._id);
                  }}
                >
                  <img
                    src={product.productImages[0]}
                    alt={product.imageAlt}
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
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute " />
                      {product.productName}
                    </a>
                  </h3>
                  <p className="mt-2">
                    <span className="text-red-500 font-bold">
                      Rs.{product.salePrice}
                    </span>
                    <span className="ml-2 line-through text-gray-500">
                      Rs.{product.originalPrice}
                    </span>
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 text-right">
                    <StarIcon className="inline-block w-4 h-4 mr-2 text-yellow-500 fill-current" />
                    ({product.ratingsAverage}/5){" "}
                  </p>
                  <p className="text-sm font-medium text-gray-900 pt-1">
                    {product.soldItems
                      ? `(${product.soldItems}) Sold`
                      : "(0) Sold"}
                  </p>
                </div>
              </div>{" "}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12 pb-5">
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#1"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => handlePageClick({ selected: currentPage - 1 })}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {Array.from({ length: pageCount }, (_, index) => (
              <a
                key={index}
                href="#1"
                aria-current={index === currentPage ? "page" : undefined}
                className={`relative inline-flex items-center ${
                  index === currentPage
                    ? "z-10 bg-indigo-600 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-600"
                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                } px-4 py-2 text-sm font-semibold`}
                onClick={() => handlePageClick({ selected: index })}
              >
                {index + 1}
              </a>
            ))}
            <a
              href="#next"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              onClick={() => handlePageClick({ selected: currentPage + 1 })}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Productpage;
