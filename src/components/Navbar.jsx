import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

function Navbar({ cart, decreaseQuantity, increaseQuantity, totalAmount }) {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowCart(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick), [];
        };
    });

    const [showcart, setShowCart] = useState(false);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className="flex px-24 py-1.5 bg-amber-200 items-center justify-between w-full">
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

            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setShowCart((prev) => !prev)}
                    className="bg-black text-white px-4 py-1 rounded"
                >
                    Cart {totalItems > 0 && `${totalItems}`}
                </button>

                {showcart && (
                    <div className="fixed top-10 right-5 w-full max-w-[240px] hide-scrollbar max-h-[80vh] overflow-y-auto bg-white shadow-lg rounded p-5 z-50">
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
        </nav>
    );
}

export default Navbar;
