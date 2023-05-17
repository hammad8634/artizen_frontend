// import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
// import PrivateComponent from "./PrivateComponents/PrivateComponent";
import ForgotPassword from "./authentication/forgotPassword";
import LoginPage from "./authentication/loginPage";
import SignUpPage from "./authentication/signupPage";
import AboutUs from "./components/aboutUs";
import CartPage from "./components/cartPage";
import CheckoutForm from "./components/checkoutPage";
import ContactUs from "./components/contactUs";
import FilterPageProducts from "./components/filterPageProducts";
import Homepage from "./components/homepage";
import ScrollToTopButton from "./components/scrollUp";
import ProductDetailPage from "./components/singleProduct";
import WishlistPage from "./components/wishlistPage";
import { default as Page404 } from "./errorPages/404Page";
import "./tailwind.css";
import ResetPasswordPage from "./authentication/resetPassword";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ScrollToTopButton />

        <Routes>
          {/* <Route element={<PrivateComponent />}> */}
          <Route path="/" element={<Homepage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/shop" element={<FilterPageProducts />} />
          <Route path="/singleproduct/:id" element={<ProductDetailPage />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="*" element={<Page404 />} />

          {/* <Route path="/logout" element={<h2>Logout Component</h2>} /> */}
          {/* </Route> */}
          <Route path="/home" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:token" element={<ResetPasswordPage />} />
        </Routes>
        {/* </BrowserRouter> */}
      </header>
    </div>
  );
}

export default App;
