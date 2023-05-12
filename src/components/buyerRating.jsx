import React, { useState } from "react";
import { BsStarFill, BsStar } from "react-icons/bs";

const BuyerRating = () => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

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

    // Perform submission logic here
    // You can access the rating and review text from the state variables (rating and reviewText)
    // For example, you can send a POST request to your server with the review data
  };

  return (
    <div>
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
  );
};

export default BuyerRating;
