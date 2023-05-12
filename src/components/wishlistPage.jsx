import React, { useState } from "react";
import Navbar from "../layouts/navbar";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([
    {
      id: 1,
      name: "Product 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      price: 19.99,
      availability: "In Stock",
      image:
        "https://s3.envato.com/files/223514658/Theme%20Previews/11-Wishlist.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      description:
        "Sed ut perspiciatis  mjndhbggbvv vunde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
      price: 24.99,
      availability: "Out of Stock",
      image:
        "https://s3.envato.com/files/223514658/Theme%20Previews/11-Wishlist.jpg",
    },
  ]);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(
      (product) => product.id !== productId
    );
    setWishlist(updatedWishlist);
  };

  const addToCart = (productId) => {
    // Add logic to add the product to the cart
    console.log(`Product with ID ${productId} added to cart!`);
  };

  return (
    <Navbar>
      <div className="container mx-auto mt-8 p-8 ">
        <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-8 gap-4 bg-gray-100 py-2 px-4 font-bold items-center">
            <div className="md:col-span-1">Product Photo</div>
            <div className="md:col-span-1 ">Name</div>
            <div className="md:col-span-2 text-center">Description</div>
            <div className="md:col-span-1">Price</div>
            <div className="md:col-span-1">Availability</div>
            <div className="md:col-span-2 text-center">Add to Cart</div>
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
                    src={product.image}
                    alt={product.name}
                    className="w-24 h-20 object-cover rounded"
                  />
                </a>
              </div>
              <div className="md:col-span-1 flex items-center">
                {product.name}
              </div>
              <div className="md:col-span-2 line-clamp-2 flex items-center">
                {product.description}
              </div>
              <div className="md:col-span-1 flex items-center">
                ${product.price.toFixed(2)}
              </div>
              <div className="md:col-span-1 text-center flex items-center">
                <div
                  className={`${
                    product.availability === "Out of Stock"
                      ? "border border-red-500 w-auto p-2 bg-red-500 rounded-lg text-white "
                      : "border border-green-500 w-auto p-2 bg-green-500 rounded-lg text-white"
                  }`}
                >
                  {" "}
                  {product.availability}{" "}
                </div>{" "}
              </div>{" "}
              <div className="md:col-span-2  justify-center md:justify-end flex items-center p=">
                <button
                  className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg ${
                    product.availability === "Out of Stock"
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-blue-600"
                  }`}
                  onClick={() => addToCart(product.id)}
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
