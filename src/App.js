// import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
// import PrivateComponent from "./PrivateComponents/PrivateComponent";
import ForgotPassword from "./authentication/forgotPassword";
import LoginPage from "./authentication/loginPage";
import SignUpPage from "./authentication/signupPage";
import CartPage from "./components/cartPage";
import CheckoutForm from "./components/checkoutPage";
import FilterPageProducts from "./components/filterPageProducts";
import Homepage from "./components/homepage";
import ProductDetailPage from "./components/singleProduct";
import WishlistPage from "./components/wishlistPage";
import "./tailwind.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          {/* <Route element={<PrivateComponent />}> */}
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/shop" element={<FilterPageProducts />} />
          <Route path="/singleproduct" element={<ProductDetailPage />} />

          {/* <Route path="/logout" element={<h2>Logout Component</h2>} /> */}
          {/* </Route> */}
          <Route path="/home" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>
        {/* </BrowserRouter> */}
      </header>
    </div>
  );
}

export default App;
