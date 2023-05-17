import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import GoogleTranslate from "./GoogleTranslate";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {/* <GoogleTranslate /> */}
    </BrowserRouter>
  </React.StrictMode>
);
