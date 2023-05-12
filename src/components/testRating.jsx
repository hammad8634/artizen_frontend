import { faStar as faStarOutline } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";

const TestRating = ({ rating }) => {
  useEffect(() => {
    const starTotal = 5;
    const starPercentage = (rating / starTotal) * 100;
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

    document.querySelector(".stars-inner").style.width = starPercentageRounded;
  }, [rating]);

  return (
    <div className="stars-outer">
      <div className="stars-inner">
        {[...Array(5)].map((_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={index < Math.floor(rating) ? faStar : faStarOutline}
            className="text-yellow-500"
          />
        ))}
      </div>
    </div>
  );
};

export default TestRating;
