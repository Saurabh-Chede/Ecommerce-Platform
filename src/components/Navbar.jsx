import { ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartSheet from "./CartItem";
import { Link } from "react-router-dom";
import { useUser, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react";

function Navbar() {
  const { user } = useUser();
  const { cart, decreaseQuantity, increaseQuantity, totalAmount, setIsCartOpen, isCartOpen ,totalItems} = useCart();

  
  const isAdmin = user?.primaryEmailAddress?.emailAddress === "saurabhchede21@gmail.com";

  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-white shadow">
      <h1 className="text-4xl py-1 font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
        Shop
      </h1>

      <ul className="flex gap-8 items-center">
        <li>
          <Link to="/" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium">
            Home
          </Link>
        </li>
        <li>
          <Link to="/contact" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium">
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

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-3 py-2 rounded-full transition"
          >
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {totalItems}
              </span>
            )}
          </button>
        </div>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>

        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-black text-white px-3 py-1 rounded">Sign In</button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="bg-white text-black border px-3 py-1 rounded">Sign Up</button>
          </SignUpButton>
        </SignedOut>
      </div>

      <CartSheet
        open={isCartOpen}
        setOpen={setIsCartOpen}
        cart={cart}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
        totalAmount={totalAmount}
        totalItems={totalItems}
      />
    </nav>
  );
}

export default Navbar;

