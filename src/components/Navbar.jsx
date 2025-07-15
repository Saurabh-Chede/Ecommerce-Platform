// import { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
// import CartItem from "./CartItem";

// function Navbar({ cart, decreaseQuantity, increaseQuantity, totalAmount }) {
//     const dropdownRef = useRef(null);

//     useEffect(() => {
//         const handleOutsideClick = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setShowCart(false);
//             }
//         };

//         document.addEventListener("mousedown", handleOutsideClick);

//         return () => {
//             document.removeEventListener("mousedown", handleOutsideClick), [];
//         };
//     });

//     const [showcart, setShowCart] = useState(false);
//     const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

//     return (
//         <nav className="flex px-24 py-1.5 bg-amber-200 items-center justify-between w-full">
//             <ul className="flex gap-4 items-center">
//                 <li>
//                     <Link to="/">Home</Link>
//                 </li>
//                 <li>
//                     <Link to="/contact">Contact</Link>
//                 </li>
//                 <li>
//                     <Link to="/about">About</Link>
//                 </li>
//             </ul>

//             <div className="relative" ref={dropdownRef}>
//                 <button
//                     onClick={() => setShowCart((prev) => !prev)}
//                     className="bg-black text-white px-4 py-1 rounded"
//                 >
//                     Cart {totalItems > 0 && `${totalItems}`}
//                 </button>

//                 {showcart && (
//                     <div className="fixed right-0 top-12 w-full max-w-[240px] hide-scrollbar max-h-[80vh] overflow-y-auto bg-white shadow-lg rounded p-5 z-50">
//                         <CartItem
//                             cart={cart}
//                             decreaseQuantity={decreaseQuantity}
//                             increaseQuantity={increaseQuantity}
//                             totalAmount={totalAmount}
//                             totalItems={totalItems}
//                         />
//                     </div>
//                 )}
//             </div>
//         </nav>
//     );
// }

// export default Navbar;



import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingBag, X } from "lucide-react"
import CartItem from "./CartItem"
import { useUser } from "@clerk/clerk-react"

import { useCart } from "../context/CartContext";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";

function Navbar() {
  const { cart, decreaseQuantity, increaseQuantity, totalAmount } = useCart();
  const dropdownRef = useRef(null)
  const [showCart, setShowCart] = useState(false)
  const { user } = useUser(); // Clerk user
  const isAdmin = user?.primaryEmailAddress?.emailAddress === "saurabhchede21@gmail.com";

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCart(false)
      }
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowCart(false)
      }
    }

    if (showCart) {
      document.addEventListener("mousedown", handleOutsideClick)
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [showCart])

  const totalItems = cart?.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <>
      <nav className="flex px-6 md:px-24 py-4 bg-white/80 backdrop-blur-md border-b border-gray-100 items-center justify-between w-full sticky top-0 z-40">
        <ul className="flex gap-8 items-center">
          <li>
            <Link to="/" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium">
              About
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link to="/dashboard" className="text-blue-600 font-semibold">
                Dashboard
              </Link>
            </li>
          )}
        </ul>

        <div className="flex gap-2 items-center">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowCart((prev) => !prev)}
              className="relative flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-1.5 py-1.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={18} />
              
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Cart Dropdown */}
            <div
              className={`
                        fixed inset-0 z-50 transition-all duration-300 ease-in-out
                        ${showCart ? "opacity-100 visible" : "opacity-0 invisible"}
                    `}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

              {/* Cart Panel */}
              <div
                className={`
                            absolute right-4 top-20 w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-100
                            transform transition-all duration-300 ease-out
                            ${showCart ? "translate-y-0 scale-100" : "-translate-y-4 scale-95"}
                        `}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900">Shopping Cart</h3>
                  <button
                    onClick={() => setShowCart(false)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    aria-label="Close cart"
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>

                {/* Cart Content */}
                <div className="max-h-96 overflow-y-auto">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 px-6">
                      <ShoppingBag size={48} className="text-gray-300 mb-4" />
                      <p className="text-gray-500 text-center">Your cart is empty</p>
                      <p className="text-sm text-gray-400 text-center mt-1">Add some items to get started</p>
                    </div>
                  ) : (
                    <div className="p-4">
                      <CartItem
                        cart={cart}
                        decreaseQuantity={decreaseQuantity}
                        increaseQuantity={increaseQuantity}
                        totalAmount={totalAmount}
                        totalItems={totalItems}
                      />
                    </div>
                  )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                  <div className="border-t border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-gray-600">Total:</span>
                      <span className="text-xl font-bold text-gray-900">${totalAmount.toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl font-medium transition-colors duration-200">
                      Checkout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* 👉 If user is signed in, show UserButton */}
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            {/* 👉 If user is not signed in, show SignIn & SignUp buttons */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-black text-white px-3 py-1 rounded">Sign In</button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="bg-white text-black border px-3 py-1 rounded">Sign Up</button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar

