import React from "react";
import Navbar from "../layouts/navbar";
import Productpage from "./productsPage";

const HomePage = () => {
  return (
    <Navbar>
      <div className="lg:px-24 bg-gray-200">
        <Productpage  />
      </div>
    </Navbar>
  );
};

export default HomePage;
