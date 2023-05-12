import React from "react";
import Navbar from "../layouts/navbar";
import Productpage from "./productsPage";

const HomePage = () => {
  return (
    <Navbar>
      <div>
        <Productpage />
      </div>
    </Navbar>
  );
};

export default HomePage;
