import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

function Navbar({ cart, decreaseQuantity, increaseQuantity, totalAmount }) {

    const [showcart, setShowCart] = useState([])
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="flex items-center justify-between w-full">
            <ul className="flex gap-4 items-center">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>

            <div className="relative">
                <button
                    onClick={() => setShowCart((prev) => !prev)}
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                >
                    Cart ({totalItems})
                </button>

                {!showcart && (
                    // <div className="absolute flex gap-10 right-0 mt-2 max-w-[700px] overflow-clip bg-yellow-100 shadow-lg rounded p-5 z-50">
                    //     {/* 👇 Render cart item component here */}
                    //     <CartItem cart={cart}
                    //         decreaseQuantity={decreaseQuantity}
                    //         increaseQuantity={increaseQuantity}
                    //         totalAmount={totalAmount} />
                    // </div>
                    <div className="fixed top-16 right-5 w-full max-w-[240px] hide-scrollbar max-h-[80vh] overflow-y-auto bg-yellow-100 shadow-lg rounded p-5 z-50">
                        <CartItem
                            cart={cart}
                            decreaseQuantity={decreaseQuantity}
                            increaseQuantity={increaseQuantity}
                            totalAmount={totalAmount}
                        />
                    </div>

                )}

            </div>
        </nav>
    );
}

export default Navbar;
