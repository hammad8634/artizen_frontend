import React, { useState } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import "../App.css";
import Navbar from "../layouts/navbar";
import BuyerRating from "./buyerRating";
import RatingSection from "./rating";

const ProductDetailPage = () => {
  const product = {
    id: 1,
    name: "Example Product",
    price: 29.99,
    averageRating: 4.5,
    colors: ["Red", "Blue", "Green"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    faqs: ["Question 1", "Question 2", "Question 3"],
    images: [
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-03.jpg",
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    ],
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeSection, setActiveSection] = useState("reviews");

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

  const renderRatingStars = () => {
    const filledStars = Math.floor(product.averageRating);
    const hasHalfStar = product.averageRating % 1 !== 0;

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

  return (
    <Navbar>
      <div className="container mx-auto px-4 py-8 bg-gray-200">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/3 px-8">
            <img src={selectedImage} alt="Product" className="mb-4 border" />
            <div className="flex items-center justify-center mb-4">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Product Thumbnail"
                  className="w-12 h-12 rounded-full cursor-pointer mx-1 border border-gray-300"
                  onClick={() => changeImage(image)}
                />
              ))}
            </div>
          </div>
          <div className="w-full lg:w-3/5 px-4">
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <div className="flex items-center mb-4 mt-3">
              <div className="mr-2 flex items-center">
                {renderRatingStars()}
              </div>
              <span className="mr-2">
                {product.averageRating.toFixed(1)} average rating
              </span>
            </div>

            <div className="flex items-center mb-4 mt-3">
              <span className="text-green-500 font-bold">
                {" "}
                Rs.{Math.round(product.price * 10) / 10}
              </span>
              <span className="text-gray-500 line-through ml-2">
                Rs.{Math.round((product.price + 10) * 10) / 10}
              </span>
              <span className="text-red-500 font-bold ml-2">Save Rs.10</span>
            </div>

            <div className="mb-4">
              <div className="flex items-center mb-2 mt-5">
                <span className="mr-2">Color:</span>
                {product.colors.map((color, index) => (
                  <span
                    key={index}
                    className="inline-block w-6 h-6 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                  ></span>
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
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600"
                onClick={() => {
                  // Add to cart logic
                }}
              >
                Add to Cart
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                onClick={() => {
                  // Add to wishlist logic
                }}
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
          <BuyerRating />
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
                <RatingSection />
              </>
            )}
            {activeSection === "faqs" && (
              <div>
                {product.faqs.map((faq, index) => (
                  <div key={index}>{faq}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default ProductDetailPage;
