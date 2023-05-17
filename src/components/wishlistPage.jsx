import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../layouts/navbar";

const WishlistPage = () => {
  const user_info = JSON.parse(localStorage.getItem("user"));
  const user_id = user_info.data._id;
  console.log("user Id is ------- ", user_id);
  const user_token = user_info.token;
  const config = {
    headers: {
      Authorization: `Bearer ${user_token}`,
    },
  };

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/wishlist/one/${user_id}`)
      .then((response) => {
        setWishlist(response.data.wishlist);
      })
      .catch((error) => {
        console.error("Error fetching wishlist:", error);
      });
  }, [user_id]);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(
      (product) => product.id !== productId
    );
    setWishlist(updatedWishlist);
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

  return (
    <Navbar>
      <div className="container mx-auto mt-8 p-8 ">
        <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-8 gap-4 bg-gray-100 py-2 px-4 font-bold items-center">
            <div className="md:col-span-1">Product Photo</div>
            <div className="md:col-span-1 ">Name</div>
            <div className="md:col-span-2">Description</div>
            <div className="md:col-span-1">Price</div>
            <div className="md:col-span-1">Availability</div>
            <div className="md:col-span-2 text-center">Actions</div>
          </div>
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-1 md:grid-cols-8 gap-4 bg-white border border-gray-300 p-4 rounded-lg"
            >
              <div className="md:col-span-1 ">
                <a href="#.">
                  {" "}
                  <img
                    src={product.productImages[0]}
                    alt={product.productName}
                    className="w-24 h-20 object-cover rounded"
                  />
                </a>
              </div>
              <div className="md:col-span-1 flex items-center">
                {product.productName}
              </div>
              <div className="md:col-span-2 line-clamp-2 flex items-center">
                {product.description}
              </div>
              <div className="md:col-span-1 flex items-center">
                Rs. {product.originalPrice}
              </div>
              <div className="md:col-span-1 text-center flex items-center">
                <div
                  className={`${
                    product.quantity < 1
                      ? "border border-red-500 w-auto p-2 bg-red-500 rounded-lg text-white"
                      : "border border-green-500 w-auto p-2 bg-green-500 rounded-lg text-white"
                  }`}
                >
                  {product.quantity < 1 ? "Out of Stock" : "In Stock"}
                </div>
              </div>

              <div className="md:col-span-2  justify-center md:justify-end flex items-center p-1">
                <button
                  className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg ${
                    product.availability === "Out of Stock"
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-blue-600"
                  }`}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the default behavior
                    addToCart(product._id);
                  }}
                  disabled={product.availability === "Out of Stock"}
                >
                  Add to Cart
                </button>{" "}
                <div className="pl-1">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg "
                    onClick={() => removeFromWishlist(product.id)}
                  >
                    Remove From Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Navbar>
  );
};

export default WishlistPage;
