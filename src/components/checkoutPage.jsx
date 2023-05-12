import React from "react";

const CheckoutForm = () => {
  return (
    <div className="max-w-md mx-auto">
      <form>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="first-name"
                className="py-2 px-4 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="last-name"
                className="py-2 px-4 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                type="email"
                id="email"
                className="py-2 px-4 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="phone-number"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <div className="mt-1">
              <input
                type="tel"
                id="phone-number"
                className="py-2 px-4 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <div className="mt-1">
              <select
                id="country"
                className="py-2 px-4 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="street-address"
              className="block text-sm font-medium text-gray-700"
            >
              Street Address
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="street-address"
                className="py-2 px-4 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="city"
                className="py-2 px-4 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500   "
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="postal-code"
              className="block text-sm font-medium text-gray-700"
            >
              Postal Code
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="postal-code"
                className="py-2 px-4 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="card-number"
              className="block text-sm font-medium text-gray-700"
            >
              Card Number
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="card-number"
                className="py-2 px-4 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="expiration-date"
              className="block text-sm font-medium text-gray-700"
            >
              Expiration Date
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="expiration-date"
                className="py-2 px-4 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="security-code"
              className="block text-sm font-medium text-gray-700"
            >
              Security Code
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="security-code"
                className="py-2 px-4 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-5">
          <div className="flex justify-end">
            <button
              type="submit"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Place Order
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
