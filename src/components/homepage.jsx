import React from "react";
import Navbar from "../layouts/navbar";
import Productpage from "./productsPage";
import RecommendedProducts from "./recommendedProducts";

const HomePage = () => {
  const auth = localStorage.getItem("user");

  return (
    <Navbar>
      <div className="lg:px-24 bg-gray-100">
        {auth ? <RecommendedProducts /> : null}
       
        <Productpage />
      </div>
    </Navbar>
  );
};

export default HomePage;
