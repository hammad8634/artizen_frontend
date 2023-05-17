import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { useParams } from "react-router-dom";
import "../App.css";
import Navbar from "../layouts/navbar";
import RecommendedProducts from "./recommendedProducts";

const ProductDetailPage = () => {
  const user_info = JSON.parse(localStorage.getItem("user"));
  const user_id = user_info.data._id;
  const user_token = user_info.token;
  const config = {
    headers: {
      Authorization: `Bearer ${user_token}`,
      "Content-Type": "application/json",
    },
  };

  // console.log(`User id in product detailed page is: ${user_id}`);

  const ratings = [
    { stars: 5, percentage: 83 },
    { stars: 4, percentage: 67 },
    { stars: 3, percentage: 50 },
    { stars: 2, percentage: 33 },
    { stars: 1, percentage: 17 },
  ];
  const faqSection = {
    faqs: ["Question 1", "Question 2", "Question 3"],
  };
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeSection, setActiveSection] = useState("reviews");
  const [selectedColor, setSelectedColor] = useState(null);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const changeImage = (image) => {
    setSelectedImage(image);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const toggleSection = (section) => {
    setActiveSection(section);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const renderRatingStars = () => {
    const filledStars = Math.floor(product.ratingsAverage);
    const hasHalfStar = product.ratingsAverage % 1 !== 0;

    const stars = [];

    for (let i = 0; i < filledStars; i++) {
      stars.push(<BsStarFill key={i} className="text-yellow-500" />);
    }

    if (hasHalfStar) {
      stars.push(<BsStarHalf key={filledStars} className="text-yellow-500" />);
    }

    const remainingStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <BsStar
          key={filledStars + (hasHalfStar ? 1 : 0) + i}
          className="text-gray-300"
        />
      );
    }

    return stars;
  };

  const addToWishlist = (_id) => {
    console.log(`Adding id to wishlist:---- ${_id}`);
    const data = {
      userId: user_id,
      productId: _id,
    };

    axios
      .post("http://localhost:8000/api/v1/wishlist", data)
      .then((response) => {
        // Handle successful wishlist addition
        console.log("Added to wishlist---------:", response.data);
        alert("Product added to wishlist");
      })
      .catch((error) => {
        // Handle error
        console.error("Error adding to wishlist:", error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/product/one/${id}`)
      .then((response) => {
        setProduct(response.data.data);
        setSelectedImage(response.data.data.productImages[0]);
      })
      .catch((error) => console.log(error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

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

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleHoverRatingChange = (value) => {
    setRating(value);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      rating: rating,
      review: reviewText,
    };

    axios
      .post(`http://localhost:8000/api/v1/review/create/${id}`, data, config)
      .then((response) => {
        console.log("Review submitted:", response.data);
        setRating(0);
        setReviewText("");
        alert("Review submitted successfully");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          if (errorMessage && errorMessage.includes("duplicate key")) {
            alert("You have already given a review for this product");
          } else {
            console.error("Error submitting review:", error);
            alert("Error submitting review. Please try again.");
          }
        } else {
          console.error("Error submitting review:", error);
          alert("Error submitting review. Please try again.");
        }
      });
  };

  return (
    <Navbar>
      <div className="container mx-auto px-4 py-8 bg-gray-200">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/3 px-8">
            <img src={selectedImage} alt="Product" className="mb-4 border" />
            <div className="flex items-center justify-center mb-4">
              {product.productImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={product.productName}
                  className="w-12 h-12 rounded-full cursor-pointer mx-1 border border-gray-300"
                  onClick={() => changeImage(image)}
                />
              ))}
            </div>
          </div>
          <div className="w-full lg:w-3/5 px-4">
            <h2 className="text-2xl font-bold mb-2">{product.productName}</h2>
            <div className="flex items-center mb-4 mt-3">
              <div className="mr-2 flex items-center">
                {renderRatingStars()}
              </div>
              <span className="mr-2">
                {product.ratingsAverage} average rating
              </span>
            </div>

            <div className="flex items-center mb-4 mt-3">
              <span className="text-green-500 font-bold">
                {" "}
                Rs.{Math.round(product.salePrice * 10) / 10}
              </span>
              <span className="text-gray-500 line-through ml-2">
                Rs.{Math.round(product.originalPrice * 10) / 10}
              </span>
              <span className="text-red-500 font-bold ml-2">
                Save Rs.
                {Math.round((product.originalPrice - product.salePrice) * 10) /
                  10}
              </span>
            </div>
            <div className="mb-4">
              <div className="flex items-center mb-2 mt-5">
                <span className="mr-2 ">Category:</span>
                <span className="">{product.category.toLowerCase()}</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center mb-2 mt-5">
                <span className="mr-2">Color:</span>
                {product.colors.map((color, index) => (
                  <span
                    key={index}
                    className={`inline-block w-6 h-6 rounded-full border border-gray-300 ml-3 ${
                      selectedColor === color ? "border-black " : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorClick(color)}
                  >
                    {selectedColor === color && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white mx-auto mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center mb-2 mt-5">
              <span className="mr-2">Quantity:</span>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={decrementQuantity}
              >
                -
              </button>
              <span className="mx-2">{quantity}</span>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={incrementQuantity}
              >
                +
              </button>
            </div>
            <div className="mb-4 mt-5">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-customColor"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default behavior
                  addToCart(product._id);
                }}
              >
                Add to Cart
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                onClick={() => addToWishlist(product._id)}
              >
                Add to Wishlist
              </button>
            </div>
            <div className="">
              <div className="flex items-center mb-4">
                <h2 className="text-black-500 font-bold mt-10">
                  {" "}
                  Description:
                </h2>
              </div>
              <p className=" ml-2 ">{product.description}</p>
            </div>
          </div>
        </div>
        <div className="mb-4 p-7 ml-4">
          <div className="border-b border-gray-300 mb-4"></div>
          <div className="buyer-will-give-rating">
            <h2 className="text-xl font-bold mb-4">Submit a Review</h2>
            <form onSubmit={handleSubmit}>
              <div className="flex items-center mb-4">
                <span className="mr-2">Rating:</span>
                {[1, 2, 3, 4, 5].map((value) => (
                  <div
                    key={value}
                    className="cursor-pointer"
                    onMouseEnter={() => handleHoverRatingChange(value)}
                    onMouseLeave={() => handleHoverRatingChange(rating)}
                    onClick={() => handleRatingChange(value)}
                  >
                    {value <= rating ? (
                      <BsStarFill className="h-6 w-6 text-yellow-500 p-1" />
                    ) : (
                      <BsStar className="h-6 w-6 text-gray-400 p-1" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <label htmlFor="reviewText" className="font-bold mb-2">
                  Review:
                </label>
                <textarea
                  id="reviewText"
                  className="w-full px-3 py-2 mt-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  rows="4"
                  value={reviewText}
                  onChange={handleReviewTextChange}
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
          <div className="flex mb-2 mt-6 ">
            <div
              className={`cursor-pointer mr-4 p-2   ${
                activeSection === "reviews"
                  ? "font-bold bg-gray-600 text-white rounded-lg "
                  : ""
              }`}
              onClick={() => toggleSection("reviews")}
            >
              Reviews
            </div>
            <div
              className={`cursor-pointer p-2 pl-3 pr-3   ${
                activeSection === "faqs"
                  ? "font-bold bg-gray-600 text-white rounded-lg"
                  : ""
              }`}
              onClick={() => toggleSection("faqs")}
            >
              FAQs
            </div>
          </div>
          <div className="border border-gray-300 p-7 rounded ">
            {activeSection === "reviews" && (
              <>
                <div>Reviews section content goes here</div>

                {product.reviews.map((review, index) => {
                  // Check if the index is even
                  if (index % 2 === 0) {
                    const nextReview = product.reviews[index + 1];
                    return (
                      <div key={index} className="flex flex-row md:flex-row">
                        <div className="buyer-reviews md:w-6/12 flex ">
                          <div className="container flex flex-col w-full p-6 mx-auto divide-y rounded-md divide-gray-700">
                            <div className="flex justify-between p-4">
                              <div className="flex space-x-4">
                                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-400">
                                  <FontAwesomeIcon
                                    icon={faUser}
                                    className="text-yellow-600"
                                  />
                                </div>
                                <div>
                                  <h4 className="font-bold">
                                    {review.user.name}
                                  </h4>
                                  <span className="text-xs dark:text-gray-400">
                                    {review.createdAt}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 dark:text-yellow-500">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                  className="w-5 h-5 fill-current"
                                >
                                  <path d="..." />
                                </svg>
                                <span className="text-xl font-bold">
                                  {review.rating}
                                </span>
                              </div>
                            </div>
                            <div className="p-4 space-y-2 text-sm">
                              {review.review}
                            </div>
                          </div>{" "}
                        </div>
                        {nextReview && (
                          <div
                            key={index + 1}
                            className="buyer-reviews md:w-6/12 flex"
                          >
                            <div className="container flex flex-col w-full p-6 mx-auto divide-y rounded-md divide-gray-700">
                              <div className="flex justify-between p-4">
                                <div className="flex space-x-4">
                                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-gray-400">
                                    <FontAwesomeIcon
                                      icon={faUser}
                                      className="text-yellow-600"
                                    />
                                  </div>
                                  <div>
                                    <h4 className="font-bold">
                                      {nextReview.user.name}
                                    </h4>
                                    <span className="text-xs dark:text-gray-400">
                                      {nextReview.createdAt}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2 dark:text-yellow-500">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                    className="w-5 h-5 fill-current"
                                  >
                                    <path d="..." />
                                  </svg>
                                  <span className="text-xl font-bold">
                                    {nextReview.rating}
                                  </span>
                                </div>
                              </div>
                              <div className="p-4 space-y-2 text-sm">
                                {nextReview.review}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                })}

                <div className="flex flex-col max-w-xl p-8 shadow-sm rounded-xl lg:p-12  md:w-5/12">
                  <div className="flex flex-col w-full ">
                    <h2 className="text-3xl font-semibold text-center">
                      Customer reviews
                    </h2>
                    <div className="flex flex-wrap items-center mt-2 mb-1 space-x-2">
                      <div className="flex">
                        {[...Array(5)].map((_, index) => (
                          <button
                            key={index}
                            type="button"
                            title={`Rate ${index + 1} stars`}
                            aria-label={`Rate ${index + 1} stars`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className={`w-6 h-6 ${
                                index < 3 ? "text-yellow-500" : "text-gray-600"
                              }`}
                            >
                              <path d="..." />
                            </svg>
                          </button>
                        ))}
                      </div>
                      <span className="dark:text-gray-400">3 out of 5</span>
                    </div>
                    Total Ratings:
                    <p className="text-1xl text-blue-600 text-center">
                      {product.reviews.length} ratings
                    </p>
                    <div className="flex flex-col mt-4">
                      {ratings.map((rating, index) => (
                        <div
                          className="flex items-center space-x-1"
                          key={index}
                        >
                          <span className="flex-shrink-0 w-12 text-sm">
                            {rating.stars} star
                          </span>
                          <div className="flex-1 h-4 overflow-hidden rounded-sm dark:bg-gray-700">
                            <div
                              className="dark:bg-orange-300 h-4"
                              style={{ width: `${rating.percentage}%` }}
                            ></div>
                          </div>
                          <span className="flex-shrink-0 w-12 text-sm text-right">
                            {rating.percentage}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
            {activeSection === "faqs" && (
              <div>
                {faqSection.faqs.map((faq, index) => (
                  <div key={index}>{faq}</div>
                ))}
              </div>
            )}
          </div>
          <RecommendedProducts />
        </div>
      </div>
    </Navbar>
  );
};

export default ProductDetailPage;
