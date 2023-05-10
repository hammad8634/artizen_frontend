import axios from "axios";
// import classnames from "classnames";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const Productpage = () => {
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
        // console.log(`resssdf: ${response}`, response.data.product);
        setProducts(response.data.product);
      })
      .catch((error) => console.log(error));
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const handleLikeClick = (product) => {
    console.log("Like button clicked for product: ", product);
  };

  const addToCart = (product) => {
    console.log("Product Added to Cart: ", product);
  };

  return (
    <div className="bg-white">
      <div className="ml-14 max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Customers also purchased
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-11 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-9 ">
          {currentProducts.map((product) => (
            <div
              key={product._id}
              className={`group relative rounded-md lg:h-30 border-2 border-black-200 bg-white p-2 bg-gray-100`}
              onMouseEnter={() => setHoveredProduct(product)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="min-h-80 aspect-h-1 aspect-w-1 w-full relative overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.photos}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />

                <button
                  className="absolute top-0 right-0 m-1 bg-white rounded-full shadow-md p-2"
                  onClick={() => handleLikeClick(product._id)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 fill-current text-red-500"
                  >
                    <path d="M12 21.35l-1.14-.98C5.54 15.29 2 12.16 2 8.5 2 5.42 4.42 3 7.5 3c1.79 0 3.44.78 4.5 2.03C13.06 3.78 14.71 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.66-3.54 6.79-8.86 12.87L12 21.35z" />
                  </svg>
                </button>

                {product === hoveredProduct && (
                  <button
                    className="absolute bottom-0 left-0 w-full py-2 bg-blue-500 text-white font-medium rounded-b-md"
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
                  <p className="mt-1 font-medium text-gray-500">
                    Rs.{product.originalPrice}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900 text-right">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline-block w-4 h-4 mr-1 text-yellow-500"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 1l3.091 6.367 6.909.996-5 4.875 1.182 6.88L11 17.338l-6.182 3.748 1.182-6.88-5-4.875 6.909-.996L12 1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    ({product.ratingsAverage}/5){" "}
                  </p>
                  <p className="text-sm font-medium text-gray-900 pt-1 ">
                    ({product.soldItems}) Sold
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"flex justify-center mt-4"}
          pageClassName={"mx-2 rounded-full"}
          pageLinkClassName={
            "px-3 py-1 rounded-full hover:bg-gray-200 focus:bg-gray-200"
          }
          previousClassName={"mx-2 rounded-full"}
          previousLinkClassName={
            "px-3 py-1 rounded-full hover:bg-gray-200 focus:bg-gray-200"
          }
          nextClassName={"mx-2 rounded-full"}
          nextLinkClassName={
            "px-3 py-1 rounded-full hover:bg-gray-200 focus:bg-gray-200"
          }
          activeClassName={"bg-gray-200"}
        />
      </div>
    </div>
  );
};

export default Productpage;
