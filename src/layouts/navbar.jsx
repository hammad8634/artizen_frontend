import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleTranslate from "../GoogleTranslate";
import CartPage from "../components/cartPage";
import logo from "../images/logo.png";

const Navbar = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const auth = localStorage.getItem("user");
  const user_info = JSON.parse(auth);
  const user_name = user_info.data.name;
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate(`/login`);
  };
  // console.log(handleLogout(), auth);

  const navigation = {
    pages: [
      { name: "Home", href: "/" },
      { name: "Shop", href: "/shop" },
      { name: "About Us", href: "/aboutUs" },
      { name: "Contact Us", href: "/contactUs" },
    ],
  };

  return (
    <>
      <div className="bg-white">
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  <div className="flex px-4 pb-2 pt-5">
                    <button
                      type="button"
                      className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Links */}

                  <div className="space-y-6 border-t border-gray-200 px-4 py-6 ">
                    {navigation.pages.map((page) => (
                      <div key={page.name} className="flow-root">
                        <a
                          href={page.href}
                          className="-m-2 block p-2 font-medium text-customColor"
                        >
                          {page.name}
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    <div className="flow-root">
                      <a
                        href="/login"
                        className="-m-2 block p-2 font-medium text-white"
                      >
                        Sign in
                      </a>
                    </div>
                    <div className="flow-root">
                      <a
                        href="/signup"
                        className="-m-2 block p-2 font-medium text-white"
                      >
                        Create account
                      </a>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <header className="relative bg-customColor">
          <nav aria-label="Top" className="mx-1 max-w-9xl px-4 sm:px-6 lg:px-8">
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                <button
                  type="button"
                  className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                  onClick={() => setOpen(true)}
                >
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Logo */}
                <div className="ml-1 flex lg:ml-0 bg-white">
                  <a href="/home">
                    <span className="sr-only">Your Company</span>
                    <img className="h-16 w-20 mb" src={logo} alt="" />
                  </a>
                </div>

                {/* Flyout menus */}
                <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch ">
                  <div className="flex h-full space-x-8 ">
                    {navigation.pages.map((page) => (
                      <a
                        key={page.name}
                        href={page.href}
                        className="flex items-center text-1xl  font-medium text-white hover:text-blue-500"
                      >
                        {page.name}
                      </a>
                    ))}
                    <GoogleTranslate />
                  </div>
                </Popover.Group>

                <div className="ml-auto flex items-center">
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    {auth ? (
                      <>
                        <p className="text-sm font-medium text-white">
                          Welcome:{" "}
                          <text className="text-blue-400">'{user_name}'</text>
                        </p>
                        <span
                          className="h-6 w-px bg-gray-200"
                          aria-hidden="true"
                        />
                        <button
                          className="text-sm font-medium text-white hover:text-blue-500"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <a
                          href="/login"
                          className="text-sm font-medium text-white hover:text-blue-500"
                        >
                          Sign in
                        </a>
                        <span
                          className="h-6 w-px bg-gray-200"
                          aria-hidden="true"
                        />
                        <a
                          href="/signup"
                          className="text-sm font-medium text-white hover:text-blue-500"
                        >
                          Create account
                        </a>
                      </>
                    )}
                  </div>

                  {/* Cart */}
                  <div className="ml-4 flow-root lg:ml-6">
                    {auth ? (
                      <button
                        href="#t"
                        className="text-sm font-medium text-gray-700 hover:text-gray-800"
                        onClick={() => setCartOpen(!cartOpen)}
                      >
                        <ShoppingBagIcon
                          className="h-6 w-6 flex-shrink-0 text-white group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        <span className="sr-only">items in cart, view bag</span>
                      </button>
                    ) : (
                      <button
                        href="#t"
                        className="text-sm font-medium text-gray-700 cursor-not-allowed"
                        disabled
                      >
                        <ShoppingBagIcon
                          className="h-6 w-6 flex-shrink-0 text-white"
                          aria-hidden="true"
                        />
                        <span className="sr-only">items in cart, view bag</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
        <div className="fixed bottom-0 right-0 z-50">
          {cartOpen && <CartPage />}
        </div>
        <main className="py-0">
          <div className="">{props.children}</div>
        </main>
      </div>
    </>
  );
};
export default Navbar;
