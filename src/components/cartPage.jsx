import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";

const CartPage = () => {
  const [open, setOpen] = useState(true);
  const [cart, setCart] = useState([]);
  const user_info = JSON.parse(localStorage.getItem("user"));
  const user_id = user_info.data._id;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/cart/allItems/${user_id}`)
      .then((response) => {
        setCart(response.data.cart);
      })
      .catch((error) => {
        console.error("Error fetching Cart Products:", error);
      });
  }, [user_id]);

  const handleQuantityChange = (index, quantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = quantity;
    setCart(updatedCart);
  };

  const handleQuantityIncrement = (index) => {
    const updatedQuantity = cart[index].quantity + 1;
    handleQuantityChange(index, updatedQuantity);
  };

  const handleQuantityDecrement = (index) => {
    const updatedQuantity = cart[index].quantity - 1;
    handleQuantityChange(index, updatedQuantity);
  };
  const handleApplyQuantity = (productId, quantity) => {
    axios
      .patch(
        `http://localhost:8000/api/v1/cart/updateCartItemQuantity/${productId}`,
        {
          quantity,
        }
      )
      .then((response) => {
        const updatedCart = [...cart];
        const cartItemIndex = updatedCart.findIndex(
          (item) => item.product._id === productId
        );
        updatedCart[cartItemIndex].quantity = response.data.cartItem.quantity;
        setCart(updatedCart);
      })
      .catch((error) => {
        console.error("Error updating cart item quantity:", error);
      });
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    cart.forEach((cartItem) => {
      const { quantity, product } = cartItem;
      const productTotal = quantity * product.salePrice;
      subtotal += productTotal;
    });
    return subtotal;
  };

  const handleRemoveItem = (productId) => {
    axios
      .delete(`http://localhost:8000/api/v1/cart/delete/${productId}`)
      .then((response) => {
        const updatedCart = cart.filter(
          (cartItem) => cartItem.product._id !== productId
        );
        setCart(updatedCart);
        alert("Product Removed successfully");
      })
      .catch((error) => {
        console.error("Error removing item from cart:", error);
      });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>{" "}
                      <div className="mt-8">
                        {cart.length > 0 ? ( // Check if cart is not empty
                          <div className="flow-root">
                            <ul className="-my-6 divide-y divide-gray-200">
                              {cart.map((cartItem, index) => (
                                <li key={index} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={cartItem?.product?.productImages[0]}
                                      alt={cartItem?.product?.productName}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium ">
                                        <h3 className="text-xl">
                                          <a href={cartItem?.product?.href}>
                                            {cartItem?.product?.productName}
                                          </a>
                                        </h3>
                                        <p className="ml-4">
                                          Rs.{cartItem?.product?.salePrice}
                                        </p>
                                      </div>
                                      <p className="mt-1 text-md mb-2">
                                        Color: {cartItem?.product?.colors[0]}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="bg-gray-200 text-gray-500 hover:bg-gray-300 px-2 py-1 rounded-md"
                                          onClick={() =>
                                            handleQuantityDecrement(index)
                                          }
                                          disabled={cartItem.quantity === 0}
                                        >
                                          <span className="sr-only">
                                            Decrement
                                          </span>
                                          <svg
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M20 12H4"
                                            />
                                          </svg>
                                        </button>
                                        <input
                                          type="text"
                                          className="p-2 text-center w-10 mx-1 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                          value={cartItem.quantity}
                                          readOnly
                                        />
                                        <button
                                          type="button"
                                          className="bg-gray-200 text-gray-500 hover:bg-gray-300 px-2 py-1 rounded-md"
                                          onClick={() =>
                                            handleQuantityIncrement(index)
                                          }
                                        >
                                          <span className="sr-only">
                                            Increment
                                          </span>
                                          <svg
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                          </svg>
                                        </button>
                                      </div>
                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium hover:text-white hover:bg-blue-700 p-2 border mr-1 rounded-lg bg-blue-500 "
                                          onClick={() =>
                                            handleApplyQuantity(
                                              cartItem.product._id,
                                              cartItem.quantity
                                            )
                                          }
                                        >
                                          Apply
                                        </button>{" "}
                                        {""}
                                        <button
                                          type="button"
                                          className="font-medium hover:text-white hover:blue-red-700 p-2 border ml-1 rounded-lg bg-red-400"
                                          onClick={() =>
                                            handleRemoveItem(
                                              cartItem.product._id
                                            )
                                          }
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div className="flex justify-center items-center h-64">
                            <p className="text-lg ">
                              Cart is empty.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>Rs. {calculateSubtotal()}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <a
                          href="/checkout"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{" "}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> →</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CartPage;
