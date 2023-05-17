import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Navbar from "../layouts/navbar";

const CheckoutForm = () => {
  const cartItems = [
    {
      id: 1,
      name: "Basic Tee",
      color: "Black",
      size: "Large",
      price: 32.0,
      quantity: 1,
      image:
        "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
      category: "T-Shirts",
    },
    {
      id: 2,
      name: "Basic Tee",
      color: "Sienna",
      size: "Large",
      price: 32.0,
      quantity: 1,
      image:
        "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
      category: "T-Shirts",
    },
  ];

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 5.0;
  const taxes = 5.52;
  const total = subtotal + shipping + taxes;
  const handleQuantityChange = (index, value) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = value;
    setQuantities(updatedQuantities);
  };
  const [paymentType, setPaymentType] = useState("cashOnHand");

  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
  };

  const [quantities, setQuantities] = useState(
    cartItems.map((item) => item.quantity)
  );
  return (
    <Navbar>
      <div className="flex justify-center py-4 p-5 bg-gray-200 text-sm">
        <div className="w-full max-w-8xl bg-white shadow-md rounded-lg   ">
          <div className="flex bg-gray-100 rounded-lg">
            {/* Left Side */}
            <div className="w-7/12  mb-3 mt-5 bg-gray-100 p-10 ">
              <h2 className="text-2xl font-medium mb-6">Contact Information</h2>
              <div className="mb-8 ">
                <label htmlFor="email" className="block mb-2  ">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                  placeholder=""
                />
              </div>
              <hr className="my-10 border-gray-300" />
              <h2 className="text-2xl font-medium mb-6">
                Shipping Information
              </h2>
              <div className="flex mb-8">
                <div className="w-1/2 pr-2">
                  <label htmlFor="firstName" className="block mb-2  ">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                    placeholder=""
                  />
                </div>
                <div className="w-1/2 pl-2">
                  <label htmlFor="lastName" className="block mb-2  ">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                    placeholder=""
                  />
                </div>
              </div>
              <div className="mb-8">
                <label htmlFor="cityName" className="block mb-2 ">
                  City Name
                </label>
                <input
                  type="text"
                  id="cityName"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                  placeholder=""
                />
              </div>
              <div className="mb-8">
                <label htmlFor="address" className="block mb-2  ">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                  placeholder=""
                />
              </div>
              <div className="mb-8">
                <label htmlFor="streetNo" className="block mb-2  ">
                  Street No.
                </label>
                <input
                  type="number"
                  id="streetNo"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                  placeholder=""
                />
              </div>
              <div className="mb-8">
                <label htmlFor="phone" className="block mb-2  ">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                  placeholder=""
                />
              </div>
              <hr className="my-12 border-gray-300" />
              <h2 className="text-2xl font-medium mt-4 mb-8">Payment</h2>
              <div className="mb-8">
                <div className="flex items-center ">
                  <span className="mr-20">Payment Type : </span>
                  <div className="flex items-center mr-4">
                    <input
                      type="radio"
                      id="creditCard"
                      name="paymentType"
                      value="creditCard"
                      checked={paymentType === "creditCard"}
                      onChange={handlePaymentTypeChange}
                      className="mr-2"
                    />
                    <label htmlFor="creditCard">Credit Card</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cashOnHand"
                      name="paymentType"
                      value="cashOnHand"
                      checked={paymentType === "cashOnHand"}
                      onChange={handlePaymentTypeChange}
                      className="mr-2"
                    />
                    <label htmlFor="cashOnHand">Cash On Hand</label>
                  </div>
                </div>
              </div>
              {paymentType === "creditCard" && (
                <div>
                  <div className="mb-8 ">
                    <label htmlFor="cardNumber" className="block mb-2  ">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                      placeholder=""
                    />
                  </div>
                 
                  <div className="flex">
                    <div className="w-1/2 pr-2">
                      <label htmlFor="expiration" className="block mb-2  ">
                        Expiration date (MM/YY)
                      </label>
                      <input
                        type="text"
                        id="expiration"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                        placeholder=""
                      />
                    </div>
                    <div className="w-1/2 pl-2">
                      <label htmlFor="cvc" className="block mb-2  ">
                        CVC
                      </label>
                      <input
                        type="text"
                        id="cvc"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Right Side */}
            <div className="w-5/12 border p-14 m-8 mt-20 rounded-lg h-full bg-white ">
              {cartItems.map((item, index) => (
                <React.Fragment key={item.id}>
                  <div key={item.id} className="flex">
                    <div className="w-1/4 h-1/3 p-2 rounded-lg ">
                      <div className="h-full flex items-center justify-center border rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-h-full max-w-full mt-1 p-2"
                        />
                      </div>
                    </div>{" "}
                    <div className="w-3/4 flex flex-col justify-between">
                      <div className="mt-2">
                        <div className="flex justify-between items-center">
                          <h3 className="text-md font-medium">{item.name}</h3>
                          <div className="border p-2 rounded-lg hover:bg-gray-100">
                            <FaTrashAlt
                              className="text-red-500 cursor-pointer hover:text-red-600 "
                              size={16}
                              title="Remove"
                            />
                          </div>
                        </div>
                        <p className="text-gray-600">{item.category}</p>
                        <b>
                          {" "}
                          <p className="mt-2 pt-2 ">
                            Rs.{item.price.toFixed(2)}
                          </p>
                        </b>
                      </div>
                      <div className="flex items-center justify-end">
                        <input
                          type="number"
                          min="0"
                          value={quantities[index]}
                          onChange={(e) =>
                            handleQuantityChange(
                              index,
                              parseInt(e.target.value)
                            )
                          }
                          className="w-16 p-2 border border-gray-300 rounded text-center"
                        />
                      </div>
                    </div>
                  </div>
                  {index < cartItems.length - 1 && <hr className="my-6 mb-4" />}
                </React.Fragment>
              ))}
              <hr className="my-6" />
              <div>
                <p className="flex items-center justify-between">
                  <span className="mr-2">Subtotal:</span>
                  <span>
                    Rs.
                    {subtotal.toFixed(2)}
                  </span>
                </p>
                <p className="flex items-center justify-between mt-3">
                  <span className="mr-2">Shipping:</span>
                  <span>
                    Rs.
                    {shipping.toFixed(2)}
                  </span>
                </p>
                <hr className="my-6 mb-8" />
                <p className="text-medium font-semibold mt-4 flex items-center justify-between">
                  <span className="mr-2">Total:</span>
                  <span>
                    Rs.
                    {total.toFixed(2)}
                  </span>
                </p>
              </div>

              <hr className="my-6" />
              <button className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700">
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </div>{" "}
    </Navbar>
  );
};

export default CheckoutForm;
